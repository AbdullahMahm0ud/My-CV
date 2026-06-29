import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    const dotEl = dotRef.current as HTMLDivElement;
    const ringEl = ringRef.current as HTMLDivElement;
    if (!dotEl || !ringEl) return;

    document.body.style.cursor = 'none';

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        ringEl.classList.add('expanded');
      }
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        ringEl.classList.remove('expanded');
      }
    }

    function animate() {
      const mouse = mouseRef.current;
      dotPosRef.current.x += (mouse.x - dotPosRef.current.x) * 0.15;
      dotPosRef.current.y += (mouse.y - dotPosRef.current.y) * 0.15;
      ringPosRef.current.x += (mouse.x - ringPosRef.current.x) * 0.08;
      ringPosRef.current.y += (mouse.y - ringPosRef.current.y) * 0.08;

      dotEl.style.transform = `translate(${dotPosRef.current.x - 4}px, ${dotPosRef.current.y - 4}px)`;
      ringEl.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  );
}
