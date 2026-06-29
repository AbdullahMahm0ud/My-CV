import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Key, 
  FileCheck,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const securityLayers = [
  {
    id: 'application',
    icon: Shield,
    title: 'Application Security',
    color: '#00f5ff',
    measures: [
      'OWASP Top 10 Protection',
      'Input Validation & Sanitization',
      'CSRF & XSS Prevention',
      'Secure Session Management',
      'Rate Limiting & DDoS Protection',
    ],
  },
  {
    id: 'authentication',
    icon: Key,
    title: 'Authentication & Access',
    color: '#a855f7',
    measures: [
      'Multi-Factor Authentication (MFA)',
      'OAuth 2.0 / OpenID Connect',
      'Role-Based Access Control (RBAC)',
      'JWT with Short Expiry',
      'Biometric Authentication Support',
    ],
  },
  {
    id: 'data',
    icon: Lock,
    title: 'Data Protection',
    color: '#10b981',
    measures: [
      'AES-256 Encryption at Rest',
      'TLS 1.3 for Data in Transit',
      'End-to-End Encryption',
      'Secure Key Management (HSM)',
      'Data Masking & Tokenization',
    ],
  },
  {
    id: 'network',
    icon: Server,
    title: 'Network Security',
    color: '#f59e0b',
    measures: [
      'Web Application Firewall (WAF)',
      'DDoS Mitigation',
      'IP Whitelisting/Blacklisting',
      'VPC Isolation',
      'Zero Trust Architecture',
    ],
  },
  {
    id: 'monitoring',
    icon: Eye,
    title: 'Monitoring & Compliance',
    color: '#ff6b6b',
    measures: [
      'Real-time Threat Detection',
      'SIEM Integration',
      'Audit Logging',
      'SOC 2 Type II Certified',
      'GDPR & HIPAA Compliant',
    ],
  },
  {
    id: 'infrastructure',
    icon: FileCheck,
    title: 'Infrastructure Security',
    color: '#ec4899',
    measures: [
      'Container Security Scanning',
      'Vulnerability Management',
      'Patch Management Automation',
      'Immutable Infrastructure',
      'Disaster Recovery Plans',
    ],
  },
];

const SecurityArchitecture = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string>('application');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.security-heading',
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

      gsap.fromTo(
        '.security-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeLayerData = securityLayers.find(l => l.id === activeLayer);

  return (
    <section ref={sectionRef} id="security" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="security-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#00f5ff] rounded-full animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#00f5ff]">
              Enterprise-Grade Security
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Multi-Layer <span className="text-gradient-cyan">Security</span> Architecture
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Defense in depth approach with six comprehensive security layers protecting 
            your data from every possible attack vector.
          </p>
        </div>

        {/* Security Layers Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Layer Selector */}
          <div className="lg:col-span-1 space-y-3">
            {securityLayers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`security-card w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                    isActive
                      ? 'glass border-[#00f5ff]/30'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${layer.color}20` : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors"
                      style={{ color: isActive ? layer.color : '#6b7280' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold transition-colors"
                      style={{ color: isActive ? layer.color : '#fff' }}
                    >
                      {layer.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-[#00f5ff] translate-x-1' : 'text-gray-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Layer Details */}
          <div className="lg:col-span-2">
            <div className="h-full glass rounded-2xl p-8 border border-[#00f5ff]/20 relative overflow-hidden">
              {/* Background Glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-20"
                style={{ backgroundColor: activeLayerData?.color }}
              />

              {activeLayerData && (
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${activeLayerData.color}20` }}
                    >
                      <activeLayerData.icon
                        className="w-8 h-8"
                        style={{ color: activeLayerData.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-['Orbitron']">
                        {activeLayerData.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Comprehensive protection measures
                      </p>
                    </div>
                  </div>

                  {/* Measures List */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeLayerData.measures.map((measure, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: activeLayerData.color }}
                        />
                        <span className="text-sm text-gray-300">{measure}</span>
                      </div>
                    ))}
                  </div>

                  {/* Security Badge */}
                  <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#00f5ff]/10 to-[#a855f7]/10 border border-[#00f5ff]/20">
                    <Shield className="w-8 h-8 text-[#00f5ff]" />
                    <div>
                      <div className="text-sm font-semibold">Certified Secure</div>
                      <div className="text-xs text-gray-400">
                        ISO 27001 • SOC 2 Type II • GDPR Compliant
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { value: '0', label: 'Data Breaches', suffix: '' },
            { value: '99.99', label: 'Uptime', suffix: '%' },
            { value: '24/7', label: 'Security Monitoring', suffix: '' },
            { value: '&lt;1hr', label: 'Incident Response', suffix: '' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 glass rounded-xl border border-white/5"
            >
              <div className="text-3xl font-bold font-['Orbitron'] text-gradient-cyan mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityArchitecture;
