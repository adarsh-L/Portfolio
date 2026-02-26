import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PUBLICATION = {
    title: 'Remote Monitoring for Water Level of Bridges and Flood Zones',
    conference: 'IEEE ICKECS 2025',
    year: '2025',
    description: 'An IoT-based real-time system to monitor water levels at bridges and flood-prone zones using ESP32 sensors, MQTT protocol, and a cloud dashboard with SMS/email alerts.',
    abstract: 'Rising water levels at bridges and flood zones pose significant infrastructure and life-safety risks. This paper presents a cost-effective remote monitoring system leveraging IoT sensors (ultrasonic + water-level), ESP32 microcontrollers, MQTT protocol, and a cloud dashboard. Evaluated across three bridge sites, the system demonstrated 98% alert accuracy with latency under 2 seconds.',
    keywords: ['IoT', 'MQTT', 'Real-time Monitoring', 'Flood Detection', 'ESP32', 'IEEE 2025'],
}

export default function ResearchSection() {
    const [expanded, setExpanded] = useState(false)

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%)' }}
        >
            <div className="w-full max-w-3xl mx-auto px-8 py-28">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-subtitle mb-3">Published Work</p>
                    <h2 className="section-title">Research &amp; <span className="gradient-text">Publications</span></h2>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
                    className="glass rounded-2xl overflow-hidden no-advance"
                    style={{ borderColor: 'rgba(0,247,255,0.2)' }}
                >
                    {/* Header button */}
                    <button
                        className="w-full text-left px-8 py-6 flex items-start gap-5 group no-advance"
                        onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
                    >
                        <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ background: 'rgba(0,247,255,0.08)', border: '1px solid rgba(0,247,255,0.22)' }}
                        >
                            📄
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="tag-chip" style={{ background: 'rgba(0,247,255,0.1)', borderColor: 'rgba(0,247,255,0.3)', color: 'var(--glow-cyan)' }}>
                                    {PUBLICATION.conference}
                                </span>
                                <span className="tag-chip">{PUBLICATION.year}</span>
                            </div>
                            <h3 className="font-['Space_Grotesk'] font-semibold text-base leading-snug transition-colors duration-300"
                                style={{ color: 'var(--text-primary)' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--glow-cyan)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            >
                                {PUBLICATION.title}
                            </h3>
                            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                {PUBLICATION.description}
                            </p>
                        </div>
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}
                            className="flex-shrink-0 text-lg mt-1"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            ↓
                        </motion.span>
                    </button>

                    {/* Expandable */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="px-8 pb-8 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                                    <h4 className="text-xs font-['Space_Grotesk'] uppercase tracking-widest mb-3"
                                        style={{ color: 'var(--text-muted)' }}>Abstract</h4>
                                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.82 }}>
                                        {PUBLICATION.abstract}
                                    </p>
                                    <h4 className="text-xs font-['Space_Grotesk'] uppercase tracking-widest mb-3"
                                        style={{ color: 'var(--text-muted)' }}>Keywords</h4>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {PUBLICATION.keywords.map(kw => <span key={kw} className="tag-chip">{kw}</span>)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: 'var(--glow-cyan)' }} />
                                        <span className="text-xs font-['Space_Grotesk'] font-medium" style={{ color: 'var(--glow-cyan)' }}>
                                            IEEE Published — ICKECS 2025
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-xs mt-8 font-['Space_Grotesk']"
                    style={{ color: 'var(--text-muted)' }}
                >
                    More research underway — exploring Quantum ML &amp; Edge AI
                </motion.p>
            </div>
        </div>
    )
}
