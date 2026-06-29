import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 99.99,
    suffix: '%',
    label: 'Threat Detection',
    description: 'Industry-leading accuracy',
    color: '#00f5ff',
  },
  {
    value: 50,
    suffix: 'ms',
    prefix: '<',
    label: 'Response Time',
    description: 'Lightning-fast reaction',
    color: '#a855f7',
  },
  {
    value: 0,
    suffix: '',
    label: 'Data Breaches',
    description: 'Perfect security record',
    color: '#10b981',
  },
];

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          if (!hasAnimated) {
            setHasAnimated(true);
            
            gsap.fromTo(
              '.stat-divider',
              { height: 0 },
              { height: '100%', duration: 1, ease: 'power3.out', stagger: 0.2 }
            );

            stats.forEach((stat, index) => {
              gsap.to(
                {},
                {
                  duration: 2.5,
                  ease: 'power3.out',
                  onUpdate: function () {
                    const progress = this.progress();
                    setCounts((prev) => {
                      const newCounts = [...prev];
                      newCounts[index] = Number((stat.value * progress).toFixed(2));
                      return newCounts;
                    });
                  },
                }
              );
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Terminal-like container */}
        <div className="relative glass-dark rounded-2xl p-8 md:p-12 border border-[#00f5ff]/10 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f5ff] via-[#a855f7] to-[#00f5ff]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f5ff]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a855f7]/5 rounded-full blur-[100px]" />

          {/* Terminal header */}
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00f5ff]" />
              <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="ml-4 text-xs text-gray-500 mono">ngfw_system_metrics.exe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 mono">LIVE</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {stats.map((stat, index) => (
              <div key={index} className="relative text-center">
                {/* Divider */}
                {index < stats.length - 1 && (
                  <div 
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px stat-divider" 
                    style={{ 
                      height: 0,
                      background: `linear-gradient(to bottom, transparent, ${stat.color}40, transparent)`
                    }} 
                  />
                )}

                {/* Value */}
                <div className="relative mb-3">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Orbitron']"
                    style={{ 
                      color: stat.color,
                      textShadow: `0 0 30px ${stat.color}40`
                    }}
                  >
                    {stat.prefix && <span>{stat.prefix}</span>}
                    {counts[index].toFixed(stat.value % 1 === 0 ? 0 : 2)}
                    <span>{stat.suffix}</span>
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-medium text-white mb-1 font-['Orbitron']">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <div className="mt-10 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-600 mono">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>v2.4.1-stable</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
