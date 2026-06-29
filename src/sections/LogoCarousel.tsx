import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Landmark, Factory, Briefcase, Globe2, Server, Cpu, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'TechVision', icon: Cpu },
  { name: 'FinanceCore', icon: Landmark },
  { name: 'IndustryX', icon: Factory },
  { name: 'EnterpriseOne', icon: Briefcase },
  { name: 'GlobalNet', icon: Globe2 },
  { name: 'DataSecure', icon: Server },
  { name: 'CloudFirst', icon: Building2 },
  { name: 'CyberShield', icon: Shield },
  { name: 'TechVision', icon: Cpu },
  { name: 'FinanceCore', icon: Landmark },
  { name: 'IndustryX', icon: Factory },
  { name: 'EnterpriseOne', icon: Briefcase },
  { name: 'GlobalNet', icon: Globe2 },
  { name: 'DataSecure', icon: Server },
  { name: 'CloudFirst', icon: Building2 },
  { name: 'CyberShield', icon: Shield },
];

const LogoCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#070a10] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#070a10] to-transparent z-10" />

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Trusted by Industry Leaders
        </p>
      </div>

      {/* Logo Track */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-12 animate-slide-left hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {logos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 glass rounded-xl hover:border-[#00f5ff]/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#00f5ff]/10 transition-colors">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00f5ff] transition-colors" />
                </div>
                <span className="text-lg font-medium text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
