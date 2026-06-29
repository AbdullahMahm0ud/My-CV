import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield, Zap, Lock, Activity, ChevronDown } from 'lucide-react';
import AnimatedHeroBackground from '../components/AnimatedHeroBackground';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - word by word
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.5,
          }
        );
      }

      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, ease: 'power3.out' }
      );

      // Stats animation
      gsap.fromTo(
        '.hero-stat',
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, delay: 1.3, ease: 'back.out(1.7)' }
      );

      // Hero image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotateY: 30 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, delay: 0.7, ease: 'power3.out' }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you! We will contact you soon.');
      setEmail('');
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Animated Background */}
      <AnimatedHeroBackground />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070a10] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070a10]/80 via-transparent to-[#070a10]/80 z-[1]" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00f5ff]/10 rounded-full blur-[100px] animate-pulse z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[120px] animate-pulse z-[1]" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full">
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 bg-[#00f5ff] rounded-full animate-ping" />
                <div className="relative w-3 h-3 bg-[#00f5ff] rounded-full" />
              </div>
              <span className="text-sm font-medium tracking-wider uppercase text-[#00f5ff]">
                AI-Powered Security
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] font-['Orbitron'] overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <span className="word inline-block">Secure</span>{' '}
              <span className="word inline-block text-gradient-cyan">Your</span>{' '}
              <span className="word inline-block text-gradient-cyan">Digital</span>
              <br />
              <span className="word inline-block">Future</span>{' '}
              <span className="word inline-block text-gradient-purple">With</span>{' '}
              <span className="word inline-block text-gradient-purple">NGFW</span>
            </h1>

            {/* Subheading */}
            <p
              ref={subheadingRef}
              className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed border-l-2 border-[#00f5ff] pl-6"
            >
              Next-generation firewall protection powered by artificial intelligence. 
              Detect, analyze, and neutralize threats before they reach your network.
            </p>

            {/* Email Form */}
            <div ref={formRef}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] rounded-xl opacity-30 group-hover:opacity-60 transition-opacity blur" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    className="relative w-full px-6 py-4 bg-[#0d1420] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00f5ff]/50 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00f5ff] to-[#00d4ff] text-[#070a10] font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] cyber-button overflow-hidden"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                No credit card required. 14-day free trial.
              </p>
            </div>

            {/* Trust Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-6 pt-4">
              <div className="hero-stat flex items-center gap-4 glass rounded-xl p-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f5ff]/20 to-[#00f5ff]/5 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#00f5ff]" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-['Orbitron'] text-white">500+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Enterprise Clients</div>
                </div>
              </div>
              <div className="hero-stat flex items-center gap-4 glass rounded-xl p-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#a855f7]/5 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#a855f7]" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-['Orbitron'] text-white">99.99%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Uptime SLA</div>
                </div>
              </div>
              <div className="hero-stat flex items-center gap-4 glass rounded-xl p-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-['Orbitron'] text-white">&lt;50ms</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Visual */}
          <div ref={imageRef} className="hidden lg:flex items-center justify-center relative" style={{ perspective: '1000px' }}>
            {/* Main Shield Image */}
            <div className="relative w-[500px] h-[500px]">
              {/* Rotating Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[450px] h-[450px] border border-[#00f5ff]/20 rounded-full animate-rotate-slow" />
                <div className="absolute w-[400px] h-[400px] border border-dashed border-[#a855f7]/30 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                <div className="absolute w-[350px] h-[350px] border border-[#00f5ff]/10 rounded-full animate-rotate-slow" style={{ animationDuration: '25s' }} />
              </div>

              {/* Central Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <img
                    src="/hero-animated.jpg"
                    alt="NGFW Security Shield"
                    className="w-full h-full object-contain animate-float"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-[#00f5ff]/20 blur-[60px] rounded-full -z-10" />
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '15s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 glass rounded-xl p-3">
                  <Shield className="w-6 h-6 text-[#00f5ff]" />
                </div>
              </div>
              <div className="absolute inset-0 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
                <div className="absolute bottom-10 right-10 glass rounded-xl p-3">
                  <Zap className="w-6 h-6 text-[#a855f7]" />
                </div>
              </div>
              <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '18s' }}>
                <div className="absolute bottom-10 left-10 glass rounded-xl p-3">
                  <Lock className="w-6 h-6 text-[#10b981]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
