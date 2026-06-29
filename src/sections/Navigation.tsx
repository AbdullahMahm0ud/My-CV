import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Shield } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Services', href: '#services' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Security', href: '#security' },
    { name: 'Scale', href: '#scalability' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.nav-link',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.5, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      color: '#00f5ff',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      color: '#ffffff',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 tech-ease ${
        isScrolled
          ? 'w-[95%] max-w-6xl glass-dark rounded-2xl py-3 px-6 border border-[#00f5ff]/20'
          : 'w-[95%] max-w-7xl bg-transparent py-4 px-6'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/30 to-[#a855f7]/30 rounded-lg animate-pulse" />
            <Shield className="w-6 h-6 text-[#00f5ff] relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-wider font-['Orbitron']">
            NG<span className="text-gradient-cyan">FW</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-sm font-medium tracking-wide hover:text-[#00f5ff] transition-colors tech-ease"
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          
          <a
            href="#cta"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00f5ff] to-[#00d4ff] text-[#070a10] text-sm font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 tech-ease ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 py-4 border-t border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide hover:text-[#00f5ff] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00f5ff] to-[#00d4ff] text-[#070a10] text-sm font-bold rounded-lg mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
