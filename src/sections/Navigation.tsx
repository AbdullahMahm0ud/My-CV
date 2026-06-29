import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onNavigate: (target: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Home', target: '#hero' },
    { label: 'About', target: '#about' },
    { label: 'Services', target: '#services' },
    { label: 'Portfolio', target: '#portfolio' },
    { label: 'Contact', target: '#contact' },
  ];

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll('.mobile-menu-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 }
      );
    }
  }, [menuOpen]);

  function handleNav(target: string) {
    onNavigate(target);
    setMenuOpen(false);
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(11,12,16,0.9)] backdrop-blur-[12px] border-b border-[rgba(0,240,255,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#hero');
          }}
          className="cursor-pointer"
        >
          <img
            src="/images/Mylogoupdated.png"
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.target);
              }}
              className="nav-link-underline font-body text-base font-medium tracking-wide text-text-primary hover:text-cyan-bright transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-text-primary text-2xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <i className="fas fa-bars" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div ref={menuRef} className="mobile-menu-overlay md:hidden">
          <button
            className="absolute top-6 right-6 text-text-primary text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.target);
              }}
              className="mobile-menu-item font-body text-3xl font-medium text-text-primary hover:text-cyan-bright transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
