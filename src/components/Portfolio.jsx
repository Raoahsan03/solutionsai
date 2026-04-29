import { motion } from 'framer-motion'

const CASES = [
  {
    title: 'SignalPath Logistics',
    tag: 'AI Operations',
    desc: 'Built an AI operations layer that forecasts inventory, routes orders, and reduces manual dispatch time by 68%.',
    metrics: ['-42% ops overhead', '3.2x dispatch speed', '14-day launch'],
  },
  {
    title: 'Nova Health',
    tag: 'RAG Platform',
    desc: 'Delivered a secure RAG knowledge system and admin console for clinicians to search protocols and evidence instantly.',
    metrics: ['98% search accuracy', 'HIPAA-ready', '4-week rollout'],
  },
  {
    title: 'Lumen Commerce',
    tag: 'Shopify + Automations',
    desc: 'Rebuilt the storefront with conversion-focused UX and AI workflows for support and merchandising.',
    metrics: ['+29% conversion', '-35% support load', '90 Lighthouse'],
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22D3EE' }}
          >
            Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Proof in the
            <span className="gradient-text"> execution</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mt-4 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A snapshot of how we ship AI and software systems that move the needle.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {CASES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="glass-card gradient-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>{item.tag}</span>
                <span className="text-xs font-semibold gradient-text">Case Study</span>
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.metrics.map(metric => (
                  <span
                    key={metric}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#BFDBFE' }}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
