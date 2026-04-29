import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What services does Avaira offer?',
    a: 'We design and build websites, apps, AI automations, agents, ERP systems, PRDs, and full-stack integrations tailored to your business goals.',
  },
  {
    q: 'Do you build custom AI solutions?',
    a: 'Yes. We deliver practical AI systems including RAG, automation pipelines, tool-using agents, and model fine-tuning when it makes sense.',
  },
  {
    q: 'Can you build both the app and the website?',
    a: 'Absolutely. We handle end-to-end delivery across web, mobile, and internal tools with a unified design system and shared data layer.',
  },
  {
    q: 'Do you integrate with existing APIs and tools?',
    a: 'We specialize in API integrations, data pipelines, and connecting systems so your workflows remain seamless and scalable.',
  },
  {
    q: 'What support do you provide after launch?',
    a: 'We offer monitoring, performance tuning, feature iteration, and ongoing maintenance to ensure your product scales safely.',
  },
  {
    q: 'How do we get started?',
    a: 'Use the Get a Quote modal or schedule a call. We will scope your needs quickly and share a tailored plan.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-28 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-1/2 right-0 w-[420px] h-[420px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', color: 'var(--text-primary)' }}
          >
            Answers, without the
            <span className="gradient-text"> fluff</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={item.q} className="glass-card gradient-border">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
