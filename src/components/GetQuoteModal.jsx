import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const SERVICES = [
  'Website Development',
  'App Development',
  'AI Automations',
  'Plugins',
  'Shopify Websites',
  'PRDs (Product Requirement Documents)',
  'AI Agents',
  'ERP Systems',
  'UI/UX Design',
  'API Integrations',
  'Business Automation',
]

const NEEDS = [
  'AI workflows',
  'API integrations',
  'Admin dashboard',
  'Realtime data',
  'Payments',
  'User onboarding',
  'Analytics',
  'Mobile app',
  'Automation logic',
  'Knowledge base',
  'Integrations',
  'Security and compliance',
]

const PLATFORMS = ['Web', 'Mobile', 'Web + Mobile', 'Internal tools', 'Other']
const BUDGETS = ['Under $10k', '$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+']
const TIMELINES = ['2-4 weeks', '1-2 months', '2-4 months', '4-6 months', 'Flexible']

function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2 flex-1">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: i < current ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : i === current ? 'rgba(15, 76, 129, 0.16)' : 'var(--glass-bg)',
              border: i <= current ? 'none' : '1px solid var(--border-subtle)',
              color: i <= current ? '#fff' : 'var(--text-muted)',
            }}
          >
            {i < current ? <Check size={12} strokeWidth={3} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className="h-px flex-1" style={{ background: i < current ? 'rgba(15, 76, 129, 0.4)' : 'var(--border-subtle)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function GetQuoteModal({ open, onClose }) {
  const steps = ['Basic Info', 'Select Service', 'Project Needs', 'Project Details', 'Budget & Timeline']
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    needs: [],
    idea: '',
    platform: '',
    features: '',
    references: '',
    requirements: '',
    budget: '',
    timeline: '',
  })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) {
      setStep(0)
      setSubmitted(false)
    }
  }, [open])

  const canContinue = useMemo(() => {
    if (step === 0) return form.name.trim() && form.email.includes('@') && form.company.trim()
    if (step === 1) return form.service
    if (step === 2) return form.needs.length > 0
    if (step === 3) return form.idea.trim() && form.platform
    if (step === 4) return form.budget && form.timeline
    return false
  }, [form, step])

  const setField = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const toggleNeed = (need) => {
    setForm(prev => {
      const next = prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
      return { ...prev, needs: next }
    })
  }

  const handleSubmit = () => {
    const payload = { ...form, submittedAt: new Date().toISOString() }
    localStorage.setItem('avaira-quote', JSON.stringify(payload))
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(2,6,23,0.65)' }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl glass-card gradient-border"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Get a Quote</p>
                <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>Tell us about your project</h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <StepIndicator steps={steps} current={step} />
            </div>

            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 0 24px rgba(15, 76, 129, 0.35)' }}>
                      <Check size={28} color="white" strokeWidth={3} />
                    </div>
                    <h4 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>Request received</h4>
                    <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                      We will review your details and respond within 1-2 business days with next steps.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {step === 0 && (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Name *</label>
                          <input
                            value={form.name}
                            onChange={setField('name')}
                            placeholder="Jordan Lee"
                            className="w-full rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                          <input
                            value={form.email}
                            onChange={setField('email')}
                            placeholder="jordan@company.com"
                            className="w-full rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Company *</label>
                          <input
                            value={form.company}
                            onChange={setField('company')}
                            placeholder="Acme Inc."
                            className="w-full rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="grid md:grid-cols-2 gap-3">
                        {SERVICES.map(service => (
                          <button
                            key={service}
                            onClick={() => setForm(prev => ({ ...prev, service }))}
                            className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                            style={{
                              background: form.service === service ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--glass-bg)',
                              border: form.service === service ? '1px solid rgba(15, 76, 129, 0.5)' : '1px solid var(--border-subtle)',
                              color: form.service === service ? '#fff' : 'var(--text-secondary)',
                              boxShadow: form.service === service ? '0 0 18px rgba(15, 76, 129, 0.25)' : 'none',
                            }}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-wrap gap-3">
                        {NEEDS.map(need => (
                          <button
                            key={need}
                            onClick={() => toggleNeed(need)}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                            style={{
                              background: form.needs.includes(need) ? 'rgba(15, 76, 129, 0.16)' : 'var(--glass-bg)',
                              border: form.needs.includes(need) ? '1px solid rgba(15, 76, 129, 0.45)' : '1px solid var(--border-subtle)',
                              color: form.needs.includes(need) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            }}
                          >
                            {need}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Project idea *</label>
                          <textarea
                            rows={3}
                            value={form.idea}
                            onChange={setField('idea')}
                            placeholder="Describe the core problem and vision."
                            className="w-full rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Platform *</label>
                          <div className="flex flex-wrap gap-3">
                            {PLATFORMS.map(platform => (
                              <button
                                key={platform}
                                onClick={() => setForm(prev => ({ ...prev, platform }))}
                                className="px-4 py-2 rounded-full text-sm"
                                style={{
                                  background: form.platform === platform ? 'rgba(19, 134, 166, 0.16)' : 'var(--glass-bg)',
                                  border: form.platform === platform ? '1px solid rgba(19, 134, 166, 0.45)' : '1px solid var(--border-subtle)',
                                  color: form.platform === platform ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                                }}
                              >
                                {platform}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <textarea
                            rows={3}
                            value={form.features}
                            onChange={setField('features')}
                            placeholder="Key features"
                            className="rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                          <textarea
                            rows={3}
                            value={form.references}
                            onChange={setField('references')}
                            placeholder="Reference links"
                            className="rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                          <textarea
                            rows={3}
                            value={form.requirements}
                            onChange={setField('requirements')}
                            placeholder="Requirements"
                            className="rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Budget *</label>
                          <div className="flex flex-col gap-2">
                            {BUDGETS.map(budget => (
                              <button
                                key={budget}
                                onClick={() => setForm(prev => ({ ...prev, budget }))}
                                className="px-4 py-2 rounded-xl text-sm text-left"
                                style={{
                                  background: form.budget === budget ? 'rgba(19, 134, 166, 0.16)' : 'var(--glass-bg)',
                                  border: form.budget === budget ? '1px solid rgba(19, 134, 166, 0.45)' : '1px solid var(--border-subtle)',
                                  color: form.budget === budget ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                                }}
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Timeline *</label>
                          <div className="flex flex-col gap-2">
                            {TIMELINES.map(timeline => (
                              <button
                                key={timeline}
                                onClick={() => setForm(prev => ({ ...prev, timeline }))}
                                className="px-4 py-2 rounded-xl text-sm text-left"
                                style={{
                                  background: form.timeline === timeline ? 'rgba(15, 76, 129, 0.16)' : 'var(--glass-bg)',
                                  border: form.timeline === timeline ? '1px solid rgba(15, 76, 129, 0.45)' : '1px solid var(--border-subtle)',
                                  color: form.timeline === timeline ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                }}
                              >
                                {timeline}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!submitted && (
              <div className="flex items-center justify-between px-6 py-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={() => setStep(prev => Math.max(prev - 1, 0))}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-xl text-sm"
                  style={{
                    background: step === 0 ? 'transparent' : 'var(--glass-bg)',
                    border: '1px solid var(--border-subtle)',
                    color: step === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                    opacity: step === 0 ? 0.4 : 1,
                  }}
                >
                  Back
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={!canContinue}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: canContinue ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--glass-bg)',
                      border: canContinue ? 'none' : '1px solid var(--border-subtle)',
                      color: canContinue ? '#fff' : 'var(--text-muted)',
                      boxShadow: canContinue ? '0 0 18px rgba(15, 76, 129, 0.25)' : 'none',
                    }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canContinue}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: canContinue ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--glass-bg)',
                      border: canContinue ? 'none' : '1px solid var(--border-subtle)',
                      color: canContinue ? '#fff' : 'var(--text-muted)',
                      boxShadow: canContinue ? '0 0 18px rgba(15, 76, 129, 0.25)' : 'none',
                    }}
                  >
                    Submit request
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
