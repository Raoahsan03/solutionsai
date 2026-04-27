import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    desc: 'We go deep into your business — workflows, pain points, data, and goals. We ask hard questions until we fully understand the problem space.',
    tags: ['Stakeholder interviews', 'Technical audit', 'Problem mapping'],
    color: '#3B82F6',
  },
  {
    number: '02',
    title: 'Design',
    desc: 'Architecture, data flows, and system design are mapped before a single line of code is written. We create a blueprint you can see and approve.',
    tags: ['System architecture', 'Data modeling', 'PRD creation'],
    color: '#6366F1',
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Our engineers execute with precision. Clean code, modular design, and daily progress updates keep you in the loop at every stage.',
    tags: ['Agile sprints', 'Code reviews', 'Daily standups'],
    color: '#8B5CF6',
  },
  {
    number: '04',
    title: 'Test',
    desc: 'Every system is stress-tested before launch. We validate accuracy, performance, security, and edge cases — no shortcuts.',
    tags: ['QA & load testing', 'AI evaluation', 'Security review'],
    color: '#A855F7',
  },
  {
    number: '05',
    title: 'Scale',
    desc: 'We monitor, optimize, and help you grow. The system is built to handle 10x from day one, with full observability baked in.',
    tags: ['Performance tuning', 'Monitoring & alerts', 'Growth roadmap'],
    color: '#22D3EE',
  },
]

function TimelineStep({ step, index }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const card = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -44 : 44 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card gradient-border p-7 lg:p-8 w-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display font-black text-4xl" style={{ color: step.color, opacity: 0.3 }}>
          {step.number}
        </span>
        <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
      </div>
      <p className="leading-relaxed mb-5 text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
      <div className="flex flex-wrap gap-2">
        {step.tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${step.color}15`,
              border: `1px solid ${step.color}30`,
              color: step.color,
            }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div ref={ref} className="grid grid-cols-[1fr_56px_1fr] items-center gap-0 mb-12">
      {/* Left column */}
      <div className="pr-6 flex justify-end">
        {isLeft ? card : <div />}
      </div>

      {/* Center node */}
      <div className="flex justify-center relative z-10">
        <motion.div
          animate={active ? {
            boxShadow: `0 0 0 6px ${step.color}20, 0 0 24px ${step.color}55, 0 0 48px ${step.color}25`,
            backgroundColor: step.color,
          } : {
            boxShadow: '0 0 0 0px transparent',
            backgroundColor: 'rgba(30,41,59,1)',
          }}
          transition={{ duration: 0.5 }}
          className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: step.color }}
        />
      </div>

      {/* Right column */}
      <div className="pl-6 flex justify-start">
        {!isLeft ? card : <div />}
      </div>
    </div>
  )
}

export default function ProcessTimeline() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ['0%', '100%'])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3B82F6, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22D3EE' }}
          >
            Our Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            From idea to{' '}
            <span className="gradient-text">production</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mt-4 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A structured, transparent process that keeps you informed and confident at every stage.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Track line */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: 'calc(50% - 0.5px)', width: 1, background: 'var(--border-subtle)' }}
          />
          {/* Scroll-lit fill */}
          <motion.div
            className="absolute top-0 pointer-events-none origin-top"
            style={{
              left: 'calc(50% - 0.5px)',
              width: 1,
              height: lineHeight,
              background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6, #22D3EE)',
              boxShadow: '0 0 12px rgba(59,130,246,0.6)',
            }}
          />

          <div className="py-8">
            {STEPS.map((step, i) => (
              <TimelineStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
