import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Server, 
  Cloud, 
  Cpu, 
  Layers, 
  Globe,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scalabilityFeatures = [
  {
    icon: Database,
    title: 'Distributed Database',
    description: 'Cassandra & ClickHouse cluster handling petabytes of security data with automatic sharding and replication.',
    metric: '10+ PB',
    metricLabel: 'Data Capacity',
  },
  {
    icon: Server,
    title: 'Auto-Scaling Infrastructure',
    description: 'Kubernetes-based microservices that automatically scale based on load, from hundreds to millions of users.',
    metric: '1M+',
    metricLabel: 'Concurrent Users',
  },
  {
    icon: Cloud,
    title: 'Multi-Region Deployment',
    description: 'Globally distributed across 50+ regions with automatic failover and sub-50ms latency worldwide.',
    metric: '50+',
    metricLabel: 'Global Regions',
  },
  {
    icon: Cpu,
    title: 'AI/ML Processing',
    description: 'GPU clusters for real-time threat analysis processing millions of events per second.',
    metric: '10M+',
    metricLabel: 'Events/Second',
  },
  {
    icon: Layers,
    title: 'Event-Driven Architecture',
    description: 'Apache Kafka streams handling trillions of events with guaranteed delivery and processing.',
    metric: '1T+',
    metricLabel: 'Daily Events',
  },
  {
    icon: Globe,
    title: 'CDN & Edge Computing',
    description: 'Cloudflare & AWS CloudFront edge network for instant threat intelligence delivery.',
    metric: '300+',
    metricLabel: 'Edge Locations',
  },
];

const performanceMetrics = [
  { label: 'API Response Time', value: '<10ms', target: 'p99' },
  { label: 'Data Ingestion', value: '5M+', target: 'records/sec' },
  { label: 'Query Performance', value: '<100ms', target: 'complex queries' },
  { label: 'System Throughput', value: '100Gbps', target: 'network' },
];

const Scalability = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scalability-heading',
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
        '.scalability-card',
        { y: 40, opacity: 0 },
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

      gsap.fromTo(
        '.metric-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.metrics-section',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="scalability" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="scalability-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#a855f7] rounded-full animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#a855f7]">
              Infinite Scale
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Built for <span className="text-gradient-purple">Trillions</span> of Records
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cloud-native architecture designed to scale infinitely. Handle millions of users 
            and trillions of security events without breaking a sweat.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16 glass rounded-2xl p-8 border border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Users Layer */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-20 glass rounded-xl flex items-center justify-center border border-[#00f5ff]/30">
                <div className="text-center">
                  <Globe className="w-6 h-6 text-[#00f5ff] mx-auto mb-1" />
                  <span className="text-xs">Users</span>
                </div>
              </div>
            </div>
            
            <ArrowUpRight className="w-5 h-5 text-gray-600" />
            
            {/* Load Balancer */}
            <div className="w-28 h-20 glass rounded-xl flex items-center justify-center border border-[#a855f7]/30">
              <div className="text-center">
                <Layers className="w-6 h-6 text-[#a855f7] mx-auto mb-1" />
                <span className="text-xs">Load Balancer</span>
              </div>
            </div>
            
            <ArrowUpRight className="w-5 h-5 text-gray-600" />
            
            {/* Microservices */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-20 glass rounded-xl flex items-center justify-center border border-[#10b981]/30">
                  <Server className="w-5 h-5 text-[#10b981]" />
                </div>
              ))}
            </div>
            
            <ArrowUpRight className="w-5 h-5 text-gray-600" />
            
            {/* Message Queue */}
            <div className="w-28 h-20 glass rounded-xl flex items-center justify-center border border-[#f59e0b]/30">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-[#f59e0b] mx-auto mb-1" />
                <span className="text-xs">Kafka</span>
              </div>
            </div>
            
            <ArrowUpRight className="w-5 h-5 text-gray-600" />
            
            {/* Database Cluster */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-20 glass rounded-xl flex items-center justify-center border border-[#ec4899]/30">
                  <Database className="w-5 h-5 text-[#ec4899]" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4 text-xs text-gray-500">
            Microservices Architecture with Event-Driven Data Flow
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {scalabilityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="scalability-card group relative glass rounded-2xl p-6 border border-white/5 hover:border-[#00f5ff]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-[#a855f7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon & Metric */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f5ff]/20 to-[#a855f7]/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#00f5ff]" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold font-['Orbitron'] text-gradient-cyan">
                        {feature.metric}
                      </div>
                      <div className="text-xs text-gray-500">{feature.metricLabel}</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00f5ff] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="metrics-section glass rounded-2xl p-8 border border-white/5">
          <h3 className="text-xl font-bold font-['Orbitron'] mb-6 text-center">
            Performance <span className="text-gradient-cyan">Benchmarks</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <span className="text-xs text-gray-500">{metric.target}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="metric-bar h-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] rounded-full origin-left"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="mt-2 text-xl font-bold font-['Orbitron'] text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scale Tiers */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { tier: 'Starter', users: '1-1,000', events: '1M/month', price: 'Free' },
            { tier: 'Business', users: '1,000-100K', events: '100M/month', price: 'Custom' },
            { tier: 'Enterprise', users: '100K+', events: 'Unlimited', price: 'Contact Us' },
          ].map((plan, index) => (
            <div
              key={index}
              className={`glass rounded-xl p-6 border ${
                index === 1
                  ? 'border-[#00f5ff]/30'
                  : 'border-white/5'
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">{plan.tier}</div>
              <div className="text-2xl font-bold font-['Orbitron'] mb-4">{plan.price}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Users</span>
                  <span>{plan.users}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Events</span>
                  <span>{plan.events}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scalability;
