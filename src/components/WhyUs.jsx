import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const CODE_SNIPPETS = [
  `# Avaira AI Core
from avaira import Pipeline, LLMChain

pipeline = Pipeline(
  model="gpt-4o",
  temperature=0.2,
)

response = pipeline.run(
  prompt=user_query,
  context=retrieved_docs,
)
return response.output`,

  `# RAG Engine
from avaira.rag import Retriever

retriever = Retriever(
  index="pinecone-prod",
  top_k=5,
  rerank=True,
)

docs = retriever.search(query)
answer = llm.generate(
  context=docs,
  question=query,
)`,

  `# AI Agent Loop
agent = Agent(
  tools=[search, calculator,
         code_executor],
  memory=ConversationMemory(),
  max_steps=10,
)

result = agent.run(task)
print(result.final_answer)`,

  `# Fine-tuning Pipeline
trainer = FineTuner(
  base_model="llama-3-8b",
  dataset=custom_data,
  epochs=3,
  lora_rank=16,
)

trainer.train()
model = trainer.export()
deploy(model, endpoint="prod")`,
]

function CodeBox() {
  const [snippetIdx, setSnippetIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | paused | fading
  const charRef = useRef(0)
  const phaseRef = useRef('typing')
  const timeoutRef = useRef(null)

  const currentSnippet = CODE_SNIPPETS[snippetIdx]

  useEffect(() => {
    charRef.current = 0
    setDisplayText('')
    phaseRef.current = 'typing'
    setPhase('typing')

    function type() {
      if (phaseRef.current !== 'typing') return
      charRef.current++
      setDisplayText(currentSnippet.slice(0, charRef.current))

      if (charRef.current < currentSnippet.length) {
        timeoutRef.current = setTimeout(type, 18)
      } else {
        phaseRef.current = 'paused'
        setPhase('paused')
        timeoutRef.current = setTimeout(() => {
          phaseRef.current = 'fading'
          setPhase('fading')
          timeoutRef.current = setTimeout(() => {
            setSnippetIdx(i => (i + 1) % CODE_SNIPPETS.length)
          }, 500)
        }, 2200)
      }
    }

    const t = setTimeout(type, 100)
    return () => { clearTimeout(t); clearTimeout(timeoutRef.current) }
  }, [snippetIdx])

  const lines = displayText.split('\n')

  return (
    <div
      className="glass-card gradient-border overflow-hidden"
      style={{ fontFamily: "'Fira Code', 'Fira Mono', 'Courier New', monospace" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="ml-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          avaira_logic.py
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>running</span>
        </div>
      </div>

      {/* Code area */}
      <motion.div
        animate={{ opacity: phase === 'fading' ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="p-5 min-h-[280px] text-sm leading-relaxed overflow-hidden"
      >
        {lines.map((line, i) => {
          // Syntax highlight tokens
          const highlighted = line
            .replace(/(#.*$)/g, '<span style="color:#6B7280">$1</span>')
            .replace(/\b(from|import|return|print|def|class|if|else|for|in|True|False|None)\b/g, '<span style="color:#8B5CF6;font-weight:600">$1</span>')
            .replace(/"([^"]*)"/g, '<span style="color:#22D3EE">"$1"</span>')
            .replace(/'([^']*)'/g, '<span style="color:#22D3EE">\'$1\'</span>')
            .replace(/\b(\d+)\b/g, '<span style="color:#F59E0B">$1</span>')
            .replace(/\b(Pipeline|LLMChain|Retriever|Agent|FineTuner|ConversationMemory)\b/g, '<span style="color:#3B82F6">$1</span>')

          return (
            <div key={i} className="flex">
              <span className="select-none w-8 text-right pr-3 shrink-0" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }}
                style={{ color: 'var(--text-primary)', flex: 1 }} />
              {i === lines.length - 1 && (
                <span className="cursor-blink" style={{ color: '#3B82F6', fontWeight: 'bold' }}>|</span>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs border-t"
        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
      >
        <span>Python 3.11</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="gradient-text font-semibold">Avaira SDK</span>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
  })

  const points = [
    { icon: '⚡', title: 'Ruthlessly practical', desc: 'We cut through the noise and build what actually works in production — not just in demos.' },
    { icon: '🎯', title: 'Outcome-first thinking', desc: 'Every decision is grounded in measurable business impact, not technical complexity for its own sake.' },
    { icon: '🔗', title: 'End-to-end ownership', desc: 'From architecture to deployment, we take full accountability. No handoffs, no ambiguity.' },
    { icon: '🚀', title: 'Speed without chaos', desc: 'Structured sprints, daily updates, and clean delivery — fast but never reckless.' },
  ]

  return (
    <section id="why-us" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Bg glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — code editor */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <CodeBox />
          </motion.div>

          {/* Right — text */}
          <div>
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
            >
              Why Avaira
            </motion.div>

            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-display font-black leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
            >
              We build{' '}
              <span className="gradient-text">differently</span>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              Most agencies build features. We build systems. Our approach combines engineering rigor with product thinking, so every line of code serves a clear purpose.
            </motion.p>

            <div className="flex flex-col gap-6">
              {points.map((pt, i) => (
                <motion.div
                  key={pt.title}
                  variants={fadeUp(0.25 + i * 0.1)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex gap-4"
                >
                  <div
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                  >
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{pt.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
