import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeonMatrix from '../components/ui/NeonMatrix'

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate: (target: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const sectionEl = sectionRef.current as HTMLDivElement;
    const contentEl = contentRef.current as HTMLDivElement;
    if (!sectionEl || !contentEl) return;

    // Mouse parallax
    function handleMouseMove(e: MouseEvent) {
      const rect = sectionEl.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    }

    function updateParallax() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      contentEl.style.transform = `translateX(calc(${mx} * 12px - 6px)) translateY(calc(${my} * 8px - 4px))`;
      rafId = requestAnimationFrame(updateParallax);
    }

    let rafId = requestAnimationFrame(updateParallax);
    sectionEl.addEventListener('mousemove', handleMouseMove);

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.3 });
    if (subtitleRef.current) {
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
    if (nameRef.current) {
      tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.65');
    }
    if (taglineRef.current) {
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8');
    }
    if (ctaRef.current) {
      tl.to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.6');
    }

    // Scroll fade out
    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: '+=50%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(contentEl, {
          opacity: 1 - progress,
          y: -60 * progress,
        });
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      sectionEl.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-bg-dark"
    >
      <NeonMatrix />
      <div className="hero-overlay" />
      <div
        ref={contentRef}
        className="relative z-[2] h-[100dvh] flex flex-col items-center justify-center text-center px-4"
      >
        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-[30px] font-body text-base md:text-2xl font-normal tracking-[4px] text-cyan-bright uppercase mb-4"
        >
          Software Engineer
        </p>
        <h1
          ref={nameRef}
          className="opacity-0 translate-y-[50px] font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[-2px] text-text-primary"
          style={{ textShadow: '0 2px 20px rgba(11,12,16,0.8), 0 0 40px rgba(11,12,16,0.5)' }}
        >
          Abdullah
        </h1>
        <h2
          ref={taglineRef}
          className="opacity-0 translate-y-[40px] font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[-1px] text-blue-neon mt-2"
          style={{ textShadow: '0 2px 20px rgba(11,12,16,0.8), 0 0 40px rgba(11,12,16,0.5)' }}
        >
          Passionate Programmer
        </h2>
        <a
          ref={ctaRef}
          href="#portfolio"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#portfolio');
          }}
          className="opacity-0 scale-90 btn-outline mt-12"
        >
          View My Work
        </a>
      </div>
    </section>
  );
}
