import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Users, ChevronRight, Cpu, Globe, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Cpu,
    title: 'AI Threat Intelligence',
    description: 'Machine learning algorithms that continuously analyze global threat data to predict and prevent attacks before they happen.',
    features: ['Behavioral Analysis', 'Zero-Day Detection', 'Threat Prediction'],
    color: '#00f5ff',
  },
  {
    icon: Zap,
    title: 'Instant Response',
    description: 'Automated incident response with sub-second reaction times to neutralize threats before any damage occurs.',
    features: ['Auto-Containment', 'Forensic Capture', 'Recovery Automation'],
    color: '#a855f7',
  },
  {
    icon: Globe,
    title: 'Global Monitoring',
    description: '24/7 monitoring of your entire digital footprint across cloud, on-premise, and hybrid infrastructures.',
    features: ['Multi-Cloud', 'Endpoint Coverage', 'Network Visibility'],
    color: '#10b981',
  },
  {
    icon: Eye,
    title: 'Vulnerability Scanning',
    description: 'Continuous assessment of your security posture with actionable remediation recommendations.',
    features: ['CVE Database', 'Risk Scoring', 'Patch Guidance'],
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Compliance Management',
    description: 'Automated compliance reporting for SOC 2, ISO 27001, GDPR, HIPAA, and industry regulations.',
    features: ['Audit Reports', 'Policy Enforcement', 'Evidence Collection'],
    color: '#ec4899',
  },
  {
    icon: Users,
    title: 'Security Consulting',
    description: 'Expert guidance from certified security professionals to strengthen your security strategy.',
    features: ['Architecture Review', 'Penetration Testing', 'Training'],
    color: '#ff6b6b',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-heading',
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
          { rotateX: 45, opacity: 0, y: 50 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 px-6"
      style={{ perspective: '2000px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="services-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#00f5ff] rounded-full" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#00f5ff]">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Comprehensive <span className="text-gradient-cyan">Security</span> Suite
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            End-to-end cybersecurity services powered by AI and delivered by experts 
            with decades of combined experience.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Glow Effect */}
                <div className="card-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${service.color}15, transparent 70%)`
                  }}
                />

                {/* Card Content */}
                <div 
                  className="relative h-full glass rounded-2xl p-6 border border-white/5 group-hover:border-[#00f5ff]/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}08, transparent)`
                    }}
                  />

                  {/* Icon */}
                  <div className="relative mb-5">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>
                    <div 
                      className="absolute inset-0 w-14 h-14 rounded-xl border scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderColor: `${service.color}40` }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-lg font-bold font-['Orbitron'] mb-3 group-hover:text-[#00f5ff] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="relative text-gray-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="relative space-y-2 mb-5">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2 text-xs text-gray-500"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="relative flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                    style={{ color: service.color }}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
