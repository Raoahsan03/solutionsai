import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = [
  'websites',
  'mobile apps',
  'AI automations',
  'Shopify stores',
  'plugins',
  'ERP systems',
  'AI agents',
  'business growth',
]

function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glowing blobs */}
      <div
        className="blob-drift absolute rounded-full opacity-20 blur-[120px]"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
          top: '-10%', left: '-5%',
        }}
      />
      <div
        className="blob-drift-slow absolute rounded-full opacity-15 blur-[100px]"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          top: '20%', right: '-10%',
        }}
      />
      <div
        className="blob-drift absolute rounded-full opacity-15 blur-[130px]"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
          bottom: '5%', left: '30%',
          animationDelay: '-4s',
        }}
      />

      {/* SVG wave lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${-200 + i * 80} ${200 + i * 60} Q ${400 + i * 40} ${100 + i * 30}, ${800 + i * 20} ${300 + i * 50} T ${1600 + i * 30} ${200 + i * 40}`}
            stroke={i % 2 === 0 ? 'url(#wave-grad-1)' : 'url(#wave-grad-2)'}
            strokeWidth={1}
            fill="none"
            animate={{
              d: [
                `M ${-200 + i * 80} ${200 + i * 60} Q ${400 + i * 40} ${100 + i * 30}, ${800 + i * 20} ${300 + i * 50} T ${1600 + i * 30} ${200 + i * 40}`,
                `M ${-200 + i * 80} ${250 + i * 55} Q ${350 + i * 50} ${150 + i * 25}, ${820 + i * 15} ${260 + i * 55} T ${1580 + i * 35} ${230 + i * 35}`,
                `M ${-200 + i * 80} ${200 + i * 60} Q ${400 + i * 40} ${100 + i * 30}, ${800 + i * 20} ${300 + i * 50} T ${1600 + i * 30} ${200 + i * 40}`,
              ],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 220)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[70vh] flex items-center justify-center pt-[72px]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <AnimatedWaves />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.25)',
            color: '#93C5FD',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          AI, Web, Apps & Automation Solutions
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="font-display font-black leading-[1.08] tracking-tight mb-2"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: 'var(--text-primary)',
            }}>
            Digital solutions for
          </h1>

          {/* Animated word */}
          <div className="overflow-hidden" style={{ minHeight: 'clamp(3.5rem, 8vw, 7rem)' }}>
            <AnimatePresence mode="wait">
              {visible && (
                <motion.h1
                  key={wordIndex}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text font-display font-black leading-[1.08] tracking-tight"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
                >
                  {WORDS[wordIndex]}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl max-w-2xl mx-auto mt-8 mb-12 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Avaira builds websites, apps, AI automations, plugins, Shopify stores, PRDs, agents, and ERP systems that help
          businesses launch, scale, and work smarter.
        </motion.p>
      </div>
    </section>
  )
}
