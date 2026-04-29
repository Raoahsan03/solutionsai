import { motion } from 'framer-motion'
import { Calendar, Globe } from 'lucide-react'

export default function Schedule() {
  return (
    <section className="relative min-h-screen pt-28 pb-24 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, #8B5CF6 50%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
          >
            Schedule
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text-primary)' }}
          >
            Book a strategy call with
            <span className="gradient-text"> Avaira</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Choose a date and time that works for your team. We will confirm and send prep notes right away.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Calendar size={18} style={{ color: '#60A5FA' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>30-minute call</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Discovery and scope alignment</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We focus on outcomes, timeline, and feasibility. You will leave with a concrete next step, even if we do not work together.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                  <Globe size={18} style={{ color: '#22D3EE' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Your timezone</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>The schedule updates automatically based on your local time.</p>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(59,130,246,0.15)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Prefer email? Reach us at{' '}
                <a href="mailto:hello@avaira.com" className="gradient-text font-semibold hover:underline">
                  hello@avaira.com
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card gradient-border p-4 md:p-6"
          >
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
              <iframe
                title="Avaira Calendly"
                src="https://calendly.com/avaira/30min"
                className="w-full h-[680px]"
                style={{ border: 0 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
