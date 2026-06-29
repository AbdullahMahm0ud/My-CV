import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Bell, Plug, ClipboardCheck, ChevronRight, Shield, Zap, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Detection',
    description: 'Machine learning models trained on billions of security events to detect even the most sophisticated threats.',
    stat: '99.97%',
    statLabel: 'Accuracy',
    color: '#00f5ff',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Instant notifications across multiple channels with contextual information for rapid response.',
    stat: '<100ms',
    statLabel: 'Latency',
    color: '#a855f7',
  },
  {
    icon: Plug,
    title: 'Seamless Integration',
    description: 'Connect with your existing security stack including SIEM, SOAR, ticketing, and communication tools.',
    stat: '50+',
    statLabel: 'Integrations',
    color: '#10b981',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Automation',
    description: 'Automated compliance reporting and evidence collection for SOC 2, ISO 27001, GDPR, and more.',
    stat: '15+',
    statLabel: 'Frameworks',
    color: '#f59e0b',
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-heading',
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

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="features-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#00f5ff] rounded-full" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#00f5ff]">
              Platform Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Why Teams Choose <span className="text-gradient-cyan">NGFW</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built by security engineers for security teams. Every feature designed 
            to make your job easier and your infrastructure safer.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative"
              >
                <div className="relative h-full glass rounded-2xl p-8 border border-white/5 group-hover:border-[#00f5ff]/30 transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}08, transparent)`
                    }}
                  />

                  {/* Top Row: Icon & Stat */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-3xl font-bold font-['Orbitron']"
                        style={{ color: feature.color }}
                      >
                        {feature.stat}
                      </div>
                      <div className="text-xs text-gray-500">{feature.statLabel}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-bold font-['Orbitron'] mb-3 group-hover:text-[#00f5ff] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div className="relative flex items-center gap-2 text-sm font-medium text-[#00f5ff] group-hover:gap-3 transition-all duration-300">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Decorative Corner */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom left, ${feature.color}10, transparent)`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: Shield, label: 'SOC 2 Certified' },
            { icon: Zap, label: '99.99% Uptime' },
            { icon: Lock, label: 'GDPR Compliant' },
          ].map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3 glass rounded-xl px-5 py-3">
                <Icon className="w-5 h-5 text-[#00f5ff]" />
                <span className="text-sm text-gray-300">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
