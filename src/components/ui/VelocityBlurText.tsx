import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VelocityBlurTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  isHero?: boolean;
}

function processBlurText(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = '';
  const words = text.split(' ');
  words.forEach((word, wIndex) => {
    const wrap = document.createElement('span');
    wrap.className = 'blur-text-wrap';
    for (let i = 0; i < word.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'blur-text';
      charSpan.textContent = word[i];
      wrap.appendChild(charSpan);
    }
    element.appendChild(wrap);
    if (wIndex < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });
}

function wrapBlurChars(element: HTMLElement) {
  const chars = element.querySelectorAll('.blur-text');
  chars.forEach((char) => {
    const el = char as HTMLElement;
    const originalContent = el.textContent || '';
    const wrap = document.createElement('span');
    wrap.className = 'blur-text__original';
    wrap.textContent = originalContent;
    el.appendChild(wrap);
    const copyPositions = ['front', 'center', 'back'];
    copyPositions.forEach((pos) => {
      const copySpan = document.createElement('span');
      copySpan.className = `blur-text__copy blur-text__copy--${pos}`;
      copySpan.textContent = originalContent;
      copySpan.setAttribute('aria-hidden', 'true');
      el.appendChild(copySpan);
    });
  });
}

function createBlurAnimation(
  chars: { domElement: HTMLElement; i: number }[],
  centerX: number
) {
  return function (velocity: number) {
    const strength = Math.min(Math.abs(velocity) * 0.02, 1);
    chars.forEach((char, i) => {
      const dx = (i - centerX) * 0.5;
      const blurAmount = Math.max(0, Math.abs(dx) * strength * 2 - 0.5);
      const el = char.domElement;
      const front = el.querySelector('.blur-text__copy--front') as HTMLElement;
      const center = el.querySelector('.blur-text__copy--center') as HTMLElement;
      const back = el.querySelector('.blur-text__copy--back') as HTMLElement;
      el.style.transform = `scaleX(${1 + strength * 0.8})`;
      if (front) {
        front.style.filter = `blur(${blurAmount}px)`;
      }
      if (center) {
        center.style.opacity = `${strength}`;
        center.style.filter = `blur(${Math.max(0, blurAmount * 0.25 - 0.25)}px)`;
      }
      if (back) {
        back.style.filter = `blur(${blurAmount * 1.5}px)`;
      }
    });
  };
}

const VelocityBlurText = memo(function VelocityBlurText({
  text,
  className = '',
  as: Tag = 'h2',
  isHero = false,
}: VelocityBlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    processBlurText(el);
    wrapBlurChars(el);

    const allChars: { domElement: HTMLElement; i: number }[] = [];
    const wraps = el.querySelectorAll('.blur-text-wrap');
    let globalIndex = 0;
    wraps.forEach((wrap) => {
      const chars = wrap.querySelectorAll('.blur-text');
      chars.forEach((char) => {
        allChars.push({ domElement: char as HTMLElement, i: globalIndex });
        globalIndex++;
      });
    });

    const centerX = (allChars.length - 1) / 2;
    animRef.current = createBlurAnimation(allChars, centerX);

    if (!isHero) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, isHero]);

  useEffect(() => {
    let raf: number;
    function update() {
      if (animRef.current) {
        animRef.current(0);
      }
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
    >
      {text}
    </Tag>
  );
});

export default VelocityBlurText;
