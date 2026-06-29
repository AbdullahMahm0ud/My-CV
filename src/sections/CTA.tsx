import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  '14-day free trial',
  'No credit card required',
  'Cancel anytime',
];

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.to('.cta-glow-1', {
        scale: 1.5,
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.cta-glow-2', {
        scale: 1.3,
        opacity: 0.2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you! We will contact you soon.');
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} id="cta" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="cta-content relative glass-dark rounded-3xl p-8 md:p-16 border border-[#00f5ff]/20 overflow-hidden">
          {/* Animated Glows */}
          <div className="cta-glow-1 absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00f5ff]/20 blur-[120px]" />
          <div className="cta-glow-2 absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#a855f7]/20 blur-[100px]" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[#00f5ff]" />
              <span className="text-sm text-[#00f5ff]">Start for free today</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
              Ready to Secure Your{' '}
              <span className="text-gradient-cyan">Infrastructure?</span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Join thousands of security teams protecting their organizations with NGFW. 
              Get started in minutes, not months.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] rounded-xl opacity-30 group-hover:opacity-60 transition-opacity blur" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="relative w-full px-6 py-4 bg-[#0d1420] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00f5ff]/50 transition-all duration-300"
                />
              </div>
              <button
                ref={buttonRef}
                type="submit"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-[#070a10] font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.5)] overflow-hidden"
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
              >
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-[#00f5ff]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00f5ff]" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
