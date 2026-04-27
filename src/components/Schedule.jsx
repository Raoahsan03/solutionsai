import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Globe, CheckCircle2, ChevronLeft, ChevronRight, Check, User, Mail, MessageSquare, Loader2 } from 'lucide-react'

// ── Booking data ──────────────────────────────────────────────
const TIME_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay()
}

// ── Mini Calendar ─────────────────────────────────────────────
function MiniCalendar({ selected, onSelect }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const daysInMonth = getDaysInMonth(view.year, view.month)
  const firstDay = getFirstDayOfWeek(view.year, view.month)
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const prev = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 })
  const next = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 })

  const isPast = (day) => {
    const d = new Date(view.year, view.month, day)
    d.setHours(0, 0, 0, 0); today.setHours(0, 0, 0, 0)
    return d < today
  }
  const isSelected = (day) => selected &&
    selected.day === day && selected.month === view.month && selected.year === view.year
  const isToday = (day) => day === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear()

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button onClick={next} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-bold py-1" style={{ color: 'var(--text-muted)' }}>{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const past = isPast(day)
          const sel = isSelected(day)
          const tod = isToday(day)
          return (
            <button
              key={day}
              disabled={past}
              onClick={() => onSelect({ day, month: view.month, year: view.year })}
              className="aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-150 font-medium"
              style={{
                color: past ? 'var(--text-muted)' : sel ? '#fff' : tod ? '#3B82F6' : 'var(--text-primary)',
                background: sel ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : tod && !sel ? 'rgba(59,130,246,0.1)' : 'transparent',
                cursor: past ? 'not-allowed' : 'pointer',
                opacity: past ? 0.35 : 1,
                boxShadow: sel ? '0 0 12px rgba(59,130,246,0.4)' : 'none',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Time Slot Picker ──────────────────────────────────────────
function TimeSlotPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TIME_SLOTS.map(slot => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className="py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-150"
          style={{
            background: selected === slot ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : 'var(--glass-bg)',
            border: selected === slot ? '1px solid rgba(59,130,246,0.5)' : '1px solid var(--border-subtle)',
            color: selected === slot ? '#fff' : 'var(--text-secondary)',
            boxShadow: selected === slot ? '0 0 12px rgba(59,130,246,0.35)' : 'none',
          }}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}

// ── Contact Form ───────────────────────────────────────────────
function ContactForm({ date, time, onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const valid = form.name.trim() && form.email.includes('@')
  const dateLabel = date ? `${MONTHS[date.month]} ${date.day}, ${date.year}` : ''

  const inputStyle = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 12,
    padding: '12px 16px',
    color: 'var(--text-primary)',
    width: '100%',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div>
      {/* Booking summary */}
      <div className="mb-5 p-4 rounded-xl flex flex-wrap gap-4"
        style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Calendar size={14} style={{ color: '#60A5FA' }} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Clock size={14} style={{ color: '#60A5FA' }} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Globe size={14} style={{ color: '#60A5FA' }} />
          <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input value={form.name} onChange={set('name')} placeholder="Jane Smith" style={{ ...inputStyle, paddingLeft: 36 }}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Email Address *</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input value={form.email} onChange={set('email')} type="email" placeholder="jane@company.com" style={{ ...inputStyle, paddingLeft: 36 }}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Tell us about your project <span style={{ color: 'var(--text-muted)' }}>(optional)</span></label>
          <div className="relative">
            <MessageSquare size={14} className="absolute left-3 top-3.5" style={{ color: 'var(--text-muted)' }} />
            <textarea value={form.message} onChange={set('message')} rows={3} placeholder="What are you building? What's the core problem?"
              style={{ ...inputStyle, paddingLeft: 36, resize: 'none', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          </div>
        </div>

        <button
          disabled={!valid || loading}
          onClick={() => onSubmit(form)}
          className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: valid ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : 'var(--glass-bg)',
            border: valid ? 'none' : '1px solid var(--border-subtle)',
            color: valid ? '#fff' : 'var(--text-muted)',
            cursor: valid && !loading ? 'pointer' : 'not-allowed',
            boxShadow: valid ? '0 0 24px rgba(59,130,246,0.35)' : 'none',
            transform: valid && !loading ? 'scale(1)' : 'scale(0.99)',
          }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
          {loading ? 'Scheduling…' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}

// ── Success State ─────────────────────────────────────────────
function SuccessView({ date, time, name }) {
  const dateLabel = date ? `${MONTHS[date.month]} ${date.day}, ${date.year}` : ''
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow: '0 0 32px rgba(59,130,246,0.5)' }}
      >
        <Check size={28} color="white" strokeWidth={3} />
      </motion.div>
      <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
        You're booked, {name.split(' ')[0]}!
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        A confirmation has been sent to your email. We're looking forward to speaking with you.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center justify-center gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <Calendar size={15} style={{ color: '#60A5FA' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{dateLabel} · {time}</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}>
          <Globe size={15} style={{ color: '#22D3EE' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
      </div>
      <p className="text-xs mt-8" style={{ color: 'var(--text-muted)' }}>
        Can't make it? Email{' '}
        <a href="mailto:hello@envaire.com" className="gradient-text font-semibold">hello@envaire.com</a>
      </p>
    </motion.div>
  )
}

// ── Booking Widget ─────────────────────────────────────────────
function BookingWidget() {
  const [step, setStep] = useState(0) // 0=date 1=time 2=form 3=done
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitterName, setSubmitterName] = useState('')

  const STEP_LABELS = ['Choose a Date', 'Pick a Time', 'Your Details', 'Confirmed']

  const handleSubmit = (form) => {
    setLoading(true)
    setSubmitterName(form.name)
    setTimeout(() => { setLoading(false); setStep(3) }, 1800)
  }

  return (
    <div className="glass-card gradient-border overflow-hidden">
      {/* Progress bar */}
      {step < 3 && (
        <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 mb-3">
            {STEP_LABELS.slice(0, 3).map((label, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: i < step ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : i === step ? 'rgba(59,130,246,0.2)' : 'var(--glass-bg)',
                      border: i <= step ? 'none' : '1px solid var(--border-subtle)',
                      color: i <= step ? '#fff' : 'var(--text-muted)',
                    }}>
                    {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block" style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-1" style={{ background: i < step ? 'rgba(59,130,246,0.5)' : 'var(--border-subtle)' }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 3 ? (
            <motion.div key="success">
              <SuccessView date={selectedDate} time={selectedTime} name={submitterName} />
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <>
                  <MiniCalendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setStep(1) }} />
                </>
              )}
              {step === 1 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setStep(0)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {MONTHS[selectedDate?.month]} {selectedDate?.day} — Pick a time
                    </span>
                  </div>
                  <TimeSlotPicker selected={selectedTime} onSelect={(t) => { setSelectedTime(t); setStep(2) }} />
                </>
              )}
              {step === 2 && (
                <>
                  <div className="flex items-center gap-2 mb-5">
                    <button onClick={() => setStep(1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Complete your booking</span>
                  </div>
                  <ContactForm date={selectedDate} time={selectedTime} onSubmit={handleSubmit} loading={loading} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Perks & Layout ─────────────────────────────────────────────
const PERKS = [
  { icon: Clock, text: '30-min strategy call' },
  { icon: Globe, text: 'Any timezone, any day' },
  { icon: CheckCircle2, text: 'No commitment required' },
  { icon: Calendar, text: 'Instant confirmation' },
]

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-32 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-8 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, #8B5CF6 50%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
          >
            Book a Call
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Let's talk about{' '}
            <span className="gradient-text">your project</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Schedule a free 30-minute strategy call. We'll listen, ask the right questions, and tell you exactly how we'd approach your problem.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start max-w-5xl mx-auto">
          {/* Left — perks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>
                What to expect
              </h3>
              <div className="flex flex-col gap-4">
                {PERKS.map(perk => {
                  const PerkIcon = perk.icon
                  return (
                    <div key={perk.text} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <PerkIcon size={16} style={{ color: '#60A5FA' }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{perk.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>We'll cover:</h3>
              <ul className="space-y-2.5">
                {['Your current challenges', 'The best AI/software approach', 'Timeline & scope estimate', 'Next steps — zero pressure'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="gradient-text font-bold mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(59,130,246,0.15)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Prefer email?</span>{' '}
                Reach us at{' '}
                <a href="mailto:hello@envaire.com" className="gradient-text font-semibold hover:underline">
                  hello@envaire.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right — booking widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <BookingWidget />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
