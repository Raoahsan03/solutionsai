import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const AI_TERMS = ['LLM', 'RAG', 'Finetuning', 'Gemini', 'API Integration', 'OpenAI']

// Two random, non-overlapping positions around the orbit
function getCardPositions() {
  const positions = [
    { top: '2%', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: '2%', transform: 'translateY(-50%)' },
    { top: '50%', right: '2%', transform: 'translateY(-50%)' },
    { bottom: '2%', left: '50%', transform: 'translateX(-50%)' },
    { top: '15%', left: '8%' },
    { top: '15%', right: '8%' },
    { bottom: '15%', left: '8%' },
    { bottom: '15%', right: '8%' },
  ]
  const i1 = Math.floor(Math.random() * positions.length)
  let i2 = Math.floor(Math.random() * positions.length)
  while (i2 === i1) i2 = Math.floor(Math.random() * positions.length)
  return [positions[i1], positions[i2]]
}

function OrbitSystem() {
  const [cardData, setCardData] = useState(() => ({
    terms: [AI_TERMS[0], AI_TERMS[1]],
    positions: getCardPositions(),
    visible: true,
  }))
  const termIdxRef = useRef(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCardData(prev => ({ ...prev, visible: false }))
      setTimeout(() => {
        const t1 = AI_TERMS[termIdxRef.current % AI_TERMS.length]
        const t2 = AI_TERMS[(termIdxRef.current + 1) % AI_TERMS.length]
        termIdxRef.current += 2
        setCardData({ terms: [t1, t2], positions: getCardPositions(), visible: true })
      }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  const cardStyle = {
    background: 'rgba(15,23,42,0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(59,130,246,0.3)',
    borderRadius: 12,
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    position: 'absolute',
    zIndex: 20,
  }

  return (
    <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] mx-auto flex items-center justify-center">
      {/* Ring 3 — outermost, purple */}
      <div
        className="orbit-ring-1 absolute rounded-full border opacity-30"
        style={{
          width: '100%', height: '100%',
          borderColor: 'rgba(139,92,246,0.6)',
          boxShadow: '0 0 30px rgba(139,92,246,0.15)',
        }}
      />
      {/* Ring 2 — middle, blue */}
      <div
        className="orbit-ring-2 absolute rounded-full border opacity-40"
        style={{
          width: '75%', height: '75%',
          borderColor: 'rgba(59,130,246,0.7)',
          boxShadow: '0 0 25px rgba(59,130,246,0.2)',
          borderStyle: 'dashed',
        }}
      />
      {/* Ring 1 — inner, cyan */}
      <div
        className="orbit-ring-3 absolute rounded-full border opacity-50"
        style={{
          width: '50%', height: '50%',
          borderColor: 'rgba(34,211,238,0.7)',
          boxShadow: '0 0 20px rgba(34,211,238,0.25)',
        }}
      />

      {/* Orbit dots */}
      {[
        { size: 8, orbit: '100%', angle: 45, color: '#8B5CF6' },
        { size: 6, orbit: '75%', angle: 200, color: '#3B82F6' },
        { size: 7, orbit: '50%', angle: 120, color: '#22D3EE' },
      ].map((dot, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center"
          style={{ animation: `orbit-${i % 2 === 0 ? '1' : '2'} ${12 + i * 6}s linear infinite` }}>
          <div style={{
            width: dot.size, height: dot.size,
            borderRadius: '50%',
            background: dot.color,
            boxShadow: `0 0 10px ${dot.color}`,
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }} />
        </div>
      ))}

      {/* Center */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 100, height: 100,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 0 40px rgba(139,92,246,0.3)',
        }}
      >
        <span className="font-display font-bold text-sm gradient-text">Envaire</span>
      </div>

      {/* Floating AI term cards */}
      <AnimatePresence>
        {cardData.visible && cardData.terms.map((term, i) => (
          <motion.div
            key={`${term}-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            style={{ ...cardStyle, ...cardData.positions[i], color: i === 0 ? '#93C5FD' : '#C4B5FD' }}
          >
            <span style={{ marginRight: 6, opacity: 0.6 }}>⬡</span>
            {term}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Bg glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22D3EE' }}>
              About Envaire
            </motion.div>

            <motion.h2 variants={fadeUp}
              className="font-display font-black leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}>
              An AI company focused on{' '}
              <span className="gradient-text">building what works</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              We don't chase hype. At Envaire, every solution starts with a real problem. We ask the right questions, design with intent, and deploy AI systems that deliver measurable outcomes — not demos.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              From large language models to intelligent automations, we combine deep technical expertise with a sharp product mindset. Our work lives at the intersection of practicality and ambition.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you're automating workflows, building AI agents, or transforming your software stack — we build it right, from day one.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-6">
              {[
                { label: '50+', desc: 'Projects shipped' },
                { label: '99%', desc: 'Client satisfaction' },
                { label: '3x', desc: 'Avg efficiency gain' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display font-black text-3xl gradient-text">{stat.label}</span>
                  <span className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.desc}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <OrbitSystem />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
