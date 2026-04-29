import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'

const SERVICES = [
  'Website Development',
  'App Development',
  'AI Automations',
  'Plugins',
  'Shopify Website',
  'PRDs',
  'AI Agents',
  'ERPs',
  'UI/UX Design',
  'Frontend Development',
  'Backend Development',
  'API Integration',
  'AI/ML Development',
  'Mobile Apps',
  'Admin Dashboards',
  'Business Automation',
]

const ITEM_HEIGHT = 56
const SPEED_PX = 32

export default function Services() {
  const containerRef = useRef(null)
  const y = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [containerHeight, setContainerHeight] = useState(360)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) setContainerHeight(containerRef.current.clientHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion) return
    const totalHeight = SERVICES.length * ITEM_HEIGHT
    const next = y.get() - (SPEED_PX * delta) / 1000
    y.set(next <= -totalHeight ? 0 : next)

    const centerOffset = containerHeight / 2 - ITEM_HEIGHT / 2
    const rawIndex = Math.floor(((-y.get() + centerOffset) / ITEM_HEIGHT) % SERVICES.length)
    const normalized = (rawIndex + SERVICES.length) % SERVICES.length
    if (normalized !== activeRef.current) {
      activeRef.current = normalized
      setActiveIndex(normalized)
    }
  })

  const list = [...SERVICES, ...SERVICES]

  return (
    <section id="services" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22D3EE, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#C4B5FD' }}
          >
            Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Everything Avaira builds,
            <span className="gradient-text"> in motion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mt-4 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A continuous view of our capabilities, centered on what matters most to your product.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto max-w-3xl h-[360px] rounded-3xl glass border overflow-hidden"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(11,15,25,0.9), rgba(11,15,25,0) 25%, rgba(11,15,25,0) 75%, rgba(11,15,25,0.9))',
          }} />

          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-14 pointer-events-none" style={{
            background: 'linear-gradient(90deg, rgba(59,130,246,0.12), rgba(139,92,246,0.15), rgba(34,211,238,0.12))',
            boxShadow: '0 0 30px rgba(59,130,246,0.2)',
          }} />

          <motion.div style={{ y }} className="flex flex-col items-center">
            {list.map((service, i) => {
              const baseIndex = i % SERVICES.length
              const isActive = baseIndex === activeIndex
              return (
                <div
                  key={`${service}-${i}`}
                  className="w-full flex items-center justify-center"
                  style={{ height: ITEM_HEIGHT }}
                >
                  <span
                    className="font-display font-semibold tracking-tight"
                    style={{
                      fontSize: 'clamp(1.35rem, 3.2vw, 2.5rem)',
                      color: isActive ? '#E2E8F0' : 'rgba(148,163,184,0.55)',
                      textShadow: isActive ? '0 0 30px rgba(59,130,246,0.35)' : 'none',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    }}
                  >
                    {service}
                  </span>
                </div>
              )
            })}
          </motion.div>

          <div className="absolute bottom-4 right-5 text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            Hover to pause
          </div>
        </div>
      </div>
    </section>
  )
}
