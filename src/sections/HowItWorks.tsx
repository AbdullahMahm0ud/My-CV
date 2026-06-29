import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Brain, Shield, FileBarChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Eye,
    title: 'Continuous Monitoring',
    description: 'Our agents deploy across your entire infrastructure—in cloud, on-premise, and at the edge—to collect security telemetry in real-time.',
    image: '/monitoring.jpg',
    color: '#00f5ff',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analysis',
    description: 'Machine learning models analyze patterns, detect anomalies, and identify threats using global threat intelligence feeds.',
    image: '/ai-security.jpg',
    color: '#a855f7',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Automated Response',
    description: 'Predefined playbooks trigger instant responses—blocking IPs, isolating endpoints, and alerting your team within milliseconds.',
    image: '/firewall-visual.jpg',
    color: '#10b981',
  },
  {
    number: '04',
    icon: FileBarChart,
    title: 'Intelligence Reports',
    description: 'Comprehensive dashboards and reports provide visibility into your security posture with actionable recommendations.',
    image: '/response.jpg',
    color: '#f59e0b',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hiw-heading',
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

      stepsRef.current.forEach((step, index) => {
        gsap.fromTo(
          step,
          { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="hiw-heading text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#00f5ff] rounded-full" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#00f5ff]">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Four Steps to <span className="text-gradient-cyan">Total Security</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our streamlined process gets you protected in minutes, not months. 
            Deploy, detect, defend, and document—all automatically.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                {/* Content */}
                <div className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon className="w-10 h-10" style={{ color: step.color }} />
                      <div 
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: step.color, color: '#070a10' }}
                      >
                        {step.number}
                      </div>
                    </div>
                    <div 
                      className="h-px flex-1 max-w-[100px]"
                      style={{ background: `linear-gradient(to right, ${step.color}50, transparent)` }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold font-['Orbitron']">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i <= index ? 'w-8' : 'w-2'
                        }`}
                        style={{
                          backgroundColor: i <= index ? step.color : 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-transparent to-transparent" />
                    
                    {/* Step Badge */}
                    <div className="absolute top-4 left-4 glass rounded-xl px-4 py-2">
                      <span 
                        className="text-sm font-bold"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-4 right-4 glass rounded-xl p-3 flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: step.color }}
                      />
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>

                  {/* Decorative */}
                  <div 
                    className="absolute -z-10 inset-0 rounded-2xl transform translate-x-4 translate-y-4"
                    style={{ backgroundColor: `${step.color}10` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
