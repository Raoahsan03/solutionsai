import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Bot, Puzzle, ShoppingBag, FileText, Cpu, Database } from 'lucide-react'

const SERVICES = [
  {
    id: 'web-dev',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Your digital presence, engineered for impact.',
    problem: 'Generic websites don\'t convert. Your site should work as hard as your team.',
    features: ['Custom design systems', 'Next.js / React SPAs', 'CMS integration', 'SEO & Core Web Vitals', 'Animation & micro-interactions'],
    tools: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'Sanity'],
    benefits: 'Faster load times, higher conversion rates, and a brand experience that stands out.',
    color: '#3B82F6',
  },
  {
    id: 'app-dev',
    icon: Smartphone,
    title: 'App Development',
    tagline: 'Cross-platform apps that users love.',
    problem: 'Bad UX costs you users daily. Apps need to feel native, fast, and intuitive.',
    features: ['iOS & Android apps', 'React Native / Expo', 'Offline-first architecture', 'Push notifications', 'App Store submission'],
    tools: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase'],
    benefits: 'Launch faster with a single codebase while delivering a premium native experience.',
    color: '#6366F1',
  },
  {
    id: 'ai-automations',
    icon: Bot,
    title: 'AI Automations',
    tagline: 'Eliminate repetitive work with intelligent systems.',
    problem: 'Hours wasted on manual tasks that AI can handle in seconds.',
    features: ['Workflow automation', 'Document processing', 'Email & calendar AI', 'Data extraction pipelines', 'Multi-step agent chains'],
    tools: ['LangChain', 'OpenAI', 'Zapier', 'Make.com', 'Python'],
    benefits: 'Reclaim 20+ hours per week per employee. Reduce errors. Scale without hiring.',
    color: '#8B5CF6',
  },
  {
    id: 'plugins',
    icon: Puzzle,
    title: 'Plugins & Extensions',
    tagline: 'Custom tooling that fits your exact workflow.',
    problem: 'Off-the-shelf tools never quite fit. You need something built for your specific process.',
    features: ['Browser extensions', 'VS Code plugins', 'Slack / Discord bots', 'CRM plugins', 'Custom integrations'],
    tools: ['Chrome APIs', 'Node.js', 'TypeScript', 'Slack API', 'Webhooks'],
    benefits: 'Plug directly into the tools your team already uses. Zero learning curve.',
    color: '#A855F7',
  },
  {
    id: 'shopify',
    icon: ShoppingBag,
    title: 'Shopify Development',
    tagline: 'E-commerce stores built to convert and scale.',
    problem: 'Default Shopify themes cap your revenue potential. Custom builds unlock it.',
    features: ['Custom Shopify themes', 'App integrations', 'Checkout optimization', 'Headless commerce', 'A/B tested layouts'],
    tools: ['Shopify Liquid', 'Hydrogen', 'Remix', 'Klaviyo', 'ReCharge'],
    benefits: 'Higher average order value, lower cart abandonment, and a brand-worthy storefront.',
    color: '#22D3EE',
  },
  {
    id: 'prds',
    icon: FileText,
    title: 'PRDs & Product Strategy',
    tagline: 'Turn vague ideas into precise engineering specs.',
    problem: 'Bad specs kill good products. Vague requirements lead to wasted builds.',
    features: ['User story mapping', 'Technical spec writing', 'Feature prioritization', 'Wireframe review', 'Engineering handoff'],
    tools: ['Notion', 'Figma', 'Linear', 'Mermaid', 'Whimsical'],
    benefits: 'Ship the right thing, the first time. No costly mid-project pivots.',
    color: '#F59E0B',
  },
  {
    id: 'agents',
    icon: Cpu,
    title: 'AI Agents',
    tagline: 'Autonomous systems that think and act.',
    problem: 'One-shot LLM calls aren\'t enough for complex, multi-step business problems.',
    features: ['ReAct & tool-use agents', 'RAG-powered knowledge bases', 'Multi-agent orchestration', 'Memory systems', 'Human-in-the-loop'],
    tools: ['LangGraph', 'AutoGen', 'Pinecone', 'Qdrant', 'OpenAI'],
    benefits: 'Agents that research, decide, and execute — fully supervised or autonomous.',
    color: '#EF4444',
  },
  {
    id: 'erps',
    icon: Database,
    title: 'ERPs & Business Systems',
    tagline: 'Integrated systems that run your operations.',
    problem: 'Disconnected tools create data silos, manual work, and costly errors.',
    features: ['Custom ERP development', 'Inventory management', 'HR & payroll modules', 'Financial dashboards', 'API integrations'],
    tools: ['Odoo', 'PostgreSQL', 'FastAPI', 'React', 'Docker'],
    benefits: 'One source of truth across your entire organization. Real-time data. Zero silos.',
    color: '#10B981',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card gradient-border group overflow-hidden"
      id={`service-${service.id}`}
    >
      <div className="grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px]">
        {/* Left — content */}
        <div className="p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
            >
              <Icon size={22} style={{ color: service.color }} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                {service.title}
              </h3>
              <p className="text-sm font-medium" style={{ color: service.color }}>{service.tagline}</p>
            </div>
          </div>

          {/* Problem */}
          <div className="mb-6 p-4 rounded-xl" style={{ background: `${service.color}08`, border: `1px solid ${service.color}15` }}>
            <p className="text-sm font-medium mb-1" style={{ color: service.color }}>The Problem</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{service.problem}</p>
          </div>

          {/* Features + Tools */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Included</p>
              <ul className="space-y-1.5">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: service.color, fontSize: 10 }}>◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Tools</p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map(tool => (
                  <span key={tool} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefit */}
          <p className="text-sm italic mb-6" style={{ color: 'var(--text-secondary)', borderLeft: `2px solid ${service.color}`, paddingLeft: 12 }}>
            {service.benefits}
          </p>

          {/* CTA */}
          <button
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: `${service.color}15`,
              border: `1px solid ${service.color}40`,
              color: service.color,
            }}
          >
            Start this project
            <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Right — visual panel */}
        <div
          className="relative hidden md:flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${service.color}08, transparent)` }}
        >
          {/* Large icon glow */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-[60px] transition-all duration-500 group-hover:blur-[40px]"
              style={{ background: service.color, opacity: 0.12 }}
            />
            <Icon
              size={80}
              className="relative z-10 transition-all duration-500 group-hover:scale-110"
              style={{ color: service.color, opacity: 0.5 }}
            />
          </div>

          {/* Decorative rings */}
          <div
            className="absolute w-48 h-48 rounded-full border opacity-10"
            style={{ borderColor: service.color }}
          />
          <div
            className="absolute w-32 h-32 rounded-full border opacity-15"
            style={{ borderColor: service.color, borderStyle: 'dashed' }}
          />

          {/* Number watermark */}
          <span
            className="absolute bottom-4 right-6 font-display font-black text-6xl opacity-5"
            style={{ color: service.color }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-8 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22D3EE, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#C4B5FD' }}
          >
            What We Build
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Eight ways we can{' '}
            <span className="gradient-text">help you</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mt-4 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            From AI agents to full-stack applications — every service is end-to-end.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
