import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Webhook, 
  Send, 
  Settings, 
  Search, 
  Globe, 
  Database, 
  Filter, 
  Bot,
  MessageSquare,
  Shield,
  Code,
  AlertTriangle,
  Cpu,
  FileJson,
  GitBranch,
  Play,
  Pause
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workflowNodes = [
  { id: 'webhook', icon: Webhook, label: 'Webhook', x: 5, y: 20, type: 'trigger', color: '#00f5ff' },
  { id: 'telegram-trigger', icon: MessageSquare, label: 'Telegram', x: 5, y: 50, type: 'trigger', color: '#00f5ff' },
  { id: 'send-alert', icon: Send, label: 'Start Alert', x: 18, y: 20, type: 'action', color: '#a855f7' },
  { id: 'telegram-start', icon: MessageSquare, label: 'TG Alert', x: 18, y: 50, type: 'action', color: '#a855f7' },
  { id: 'workflow-config', icon: Settings, label: 'Config', x: 31, y: 35, type: 'config', color: '#f59e0b' },
  { id: 'extract', icon: Search, label: 'Extract IOCs', x: 44, y: 35, type: 'process', color: '#10b981' },
  { id: 'virustotal', icon: Globe, label: 'VirusTotal', x: 57, y: 20, type: 'integration', color: '#3b82f6' },
  { id: 'malware-bazaar', icon: Database, label: 'MalwareBazaar', x: 57, y: 50, type: 'integration', color: '#3b82f6' },
  { id: 'hybrid-analysis', icon: Cpu, label: 'Hybrid Analysis', x: 70, y: 35, type: 'integration', color: '#3b82f6' },
  { id: 'route-threat', icon: GitBranch, label: 'Route Threat', x: 83, y: 35, type: 'decision', color: '#f59e0b' },
  { id: 'pfsense-block', icon: Shield, label: 'Block', x: 96, y: 15, type: 'action', color: '#ef4444' },
  { id: 'telegram-threat', icon: MessageSquare, label: 'Notify', x: 96, y: 35, type: 'action', color: '#a855f7' },
  { id: 'check-threat', icon: AlertTriangle, label: 'Check Intel', x: 96, y: 55, type: 'process', color: '#10b981' },
  { id: 'prepare-ai', icon: FileJson, label: 'Prepare AI', x: 109, y: 55, type: 'process', color: '#10b981' },
  { id: 'ai-analyzer', icon: Bot, label: 'AI Analyzer', x: 122, y: 55, type: 'ai', color: '#ec4899' },
  { id: 'openai-chat', icon: Code, label: 'OpenAI', x: 122, y: 75, type: 'ai', color: '#ec4899' },
  { id: 'output-parser', icon: Filter, label: 'Parse', x: 135, y: 75, type: 'process', color: '#10b981' },
  { id: 'route-ai', icon: GitBranch, label: 'Route AI', x: 148, y: 55, type: 'decision', color: '#f59e0b' },
  { id: 'pfsense-ai-block', icon: Shield, label: 'AI Block', x: 161, y: 40, type: 'action', color: '#ef4444' },
  { id: 'telegram-ai-alert', icon: MessageSquare, label: 'AI Alert', x: 161, y: 70, type: 'action', color: '#a855f7' },
];

const connections = [
  { from: 'webhook', to: 'send-alert' },
  { from: 'telegram-trigger', to: 'telegram-start' },
  { from: 'send-alert', to: 'workflow-config' },
  { from: 'telegram-start', to: 'workflow-config' },
  { from: 'workflow-config', to: 'extract' },
  { from: 'extract', to: 'virustotal' },
  { from: 'extract', to: 'malware-bazaar' },
  { from: 'virustotal', to: 'hybrid-analysis' },
  { from: 'malware-bazaar', to: 'hybrid-analysis' },
  { from: 'hybrid-analysis', to: 'route-threat' },
  { from: 'route-threat', to: 'pfsense-block' },
  { from: 'route-threat', to: 'telegram-threat' },
  { from: 'route-threat', to: 'check-threat' },
  { from: 'check-threat', to: 'prepare-ai' },
  { from: 'prepare-ai', to: 'ai-analyzer' },
  { from: 'ai-analyzer', to: 'openai-chat' },
  { from: 'openai-chat', to: 'output-parser' },
  { from: 'output-parser', to: 'route-ai' },
  { from: 'route-ai', to: 'pfsense-ai-block' },
  { from: 'route-ai', to: 'telegram-ai-alert' },
];

const Workflow = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.workflow-heading',
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
        '.workflow-container',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
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

  const executeWorkflow = () => {
    if (isExecuting) {
      setIsExecuting(false);
      setActiveNode(null);
      return;
    }

    setIsExecuting(true);
    const nodeIds = workflowNodes.map(n => n.id);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= nodeIds.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExecuting(false);
          setActiveNode(null);
        }, 1000);
        return;
      }
      setActiveNode(nodeIds[currentIndex]);
      currentIndex++;
    }, 250);
  };

  return (
    <section ref={sectionRef} id="workflow" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="workflow-heading text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-[#00f5ff] rounded-full" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#00f5ff]">
              Automation Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Orbitron'] mb-4">
            Security <span className="text-gradient-cyan">Workflow</span> Automation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visualize and execute your security automation pipeline. From detection to response, 
            every step is automated and logged.
          </p>
        </div>

        {/* Workflow Container */}
        <div className="workflow-container relative glass-dark rounded-2xl p-6 border border-[#00f5ff]/10 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { color: '#00f5ff', label: 'Trigger' },
                { color: '#a855f7', label: 'Action' },
                { color: '#3b82f6', label: 'Integration' },
                { color: '#ec4899', label: 'AI' },
                { color: '#f59e0b', label: 'Decision' },
                { color: '#10b981', label: 'Process' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={executeWorkflow}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                isExecuting
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-[#070a10] hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]'
              }`}
            >
              {isExecuting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isExecuting ? 'Stop' : 'Execute Workflow'}
            </button>
          </div>

          {/* Workflow Diagram */}
          <div className="relative overflow-x-auto pb-4">
            <div className="min-w-[1000px] h-[400px] relative">
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#00f5ff" opacity="0.5" />
                  </marker>
                </defs>
                {connections.map((conn, index) => {
                  const fromNode = workflowNodes.find(n => n.id === conn.from);
                  const toNode = workflowNodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const x1 = (fromNode.x / 170) * 100;
                  const y1 = (fromNode.y / 90) * 100;
                  const x2 = (toNode.x / 170) * 100;
                  const y2 = (toNode.y / 90) * 100;

                  const isActive = activeNode === conn.to || activeNode === conn.from;

                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={isActive ? '#00f5ff' : '#1a2332'}
                      strokeWidth={isActive ? 3 : 1.5}
                      opacity={isActive ? 1 : 0.4}
                      markerEnd="url(#arrowhead)"
                      className="transition-all duration-200"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {workflowNodes.map((node) => {
                const Icon = node.icon;
                const isActive = activeNode === node.id;

                return (
                  <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      isActive ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    style={{
                      left: `${(node.x / 170) * 100}%`,
                      top: `${(node.y / 90) * 100}%`,
                    }}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => !isExecuting && setActiveNode(null)}
                  >
                    <div
                      className={`relative flex flex-col items-center p-2.5 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                          : 'bg-[#0d1420] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
                        style={{ backgroundColor: `${node.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: node.color }} />
                      </div>
                      <span className="text-[10px] font-medium text-center whitespace-nowrap text-gray-300">
                        {node.label}
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl border-2 border-[#00f5ff] animate-ping opacity-30" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${isExecuting ? 'text-green-400' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                <span className="text-xs mono uppercase">{isExecuting ? 'Running' : 'Idle'}</span>
              </div>
              <div className="text-xs text-gray-600 mono">
                {workflowNodes.length} nodes • {connections.length} connections
              </div>
            </div>
            <div className="text-xs text-gray-600 mono">
              v2.4.1-automation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
