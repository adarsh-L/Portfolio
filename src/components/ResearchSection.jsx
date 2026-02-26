import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PUBLICATION = {
    title: 'Remote Monitoring for Water Level of Bridges and Flood Zones',
    conference: 'IEEE ICKECS 2025',
    year: '2025',
    description: 'An IoT-based real-time system to monitor water levels at bridges and flood-prone zones using ESP32 sensors, MQTT protocol, and a cloud dashboard with SMS/email alerts.',
    abstract: 'Rising water levels at bridges and flood zones pose significant infrastructure and life-safety risks. This paper presents a cost-effective remote monitoring system leveraging IoT sensors (ultrasonic + water-level), ESP32 microcontrollers, MQTT protocol, and a cloud dashboard. Evaluated across three bridge sites, the system demonstrated 98% alert accuracy with latency under 2 seconds.',
    keywords: ['IoT', 'MQTT', 'Real-time Monitoring', 'Flood Detection', 'ESP32', 'IEEE 2025'],
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WecoMWQAAAAJ&citation_for_view=WecoMWQAAAAJ:d1gkVwhDpl0C',
}

export default function ResearchSection() {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="section-wrap">
            <div className="container">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: 36 }}
                >
                    <p className="section-eyebrow" style={{ marginBottom: 8 }}>Published Work</p>
                    <h2 className="section-heading">
                        Research &amp; <span className="gradient-text">Publications</span>
                    </h2>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
                    className="card no-advance"
                    style={{ borderColor: 'rgba(0,247,255,0.2)', overflow: 'hidden' }}
                >
                    {/* Collapsible header */}
                    <button
                        className="no-advance"
                        onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
                        style={{
                            width: '100%', textAlign: 'left', padding: '24px 28px',
                            display: 'flex', alignItems: 'flex-start', gap: 16,
                            background: 'transparent', border: 'none', cursor: 'pointer',
                        }}
                    >
                        <div
                            style={{
                                flexShrink: 0, width: 48, height: 48, borderRadius: 12,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                                background: 'rgba(0,247,255,0.08)', border: '1px solid rgba(0,247,255,0.22)',
                            }}
                        >
                            📄
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                                <span className="tag" style={{ background: 'rgba(0,247,255,0.1)', borderColor: 'rgba(0,247,255,0.3)', color: 'var(--glow)' }}>
                                    {PUBLICATION.conference}
                                </span>
                                <span className="tag">{PUBLICATION.year}</span>
                            </div>
                            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.45, color: 'var(--text)', marginBottom: 8 }}>
                                {PUBLICATION.title}
                            </h3>
                            <p className="body-text" style={{ fontSize: '0.82rem' }}>
                                {PUBLICATION.description}
                            </p>
                        </div>
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}
                            style={{ flexShrink: 0, fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 4 }}
                        >
                            ↓
                        </motion.span>
                    </button>

                    {/* Expandable abstract */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '20px 28px 28px', borderTop: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}>
                                        Abstract
                                    </p>
                                    <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text)', opacity: 0.85, marginBottom: 20 }}>
                                        {PUBLICATION.abstract}
                                    </p>

                                    <p style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}>
                                        Keywords
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                                        {PUBLICATION.keywords.map(kw => <span key={kw} className="tag">{kw}</span>)}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div className="glow-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--glow)' }} />
                                            <span style={{ fontSize: '0.73rem', fontFamily: 'Space Grotesk', fontWeight: 600, color: 'var(--glow)' }}>
                                                IEEE Published — ICKECS 2025
                                            </span>
                                        </div>
                                        <a href={PUBLICATION.link} target="_blank" rel="noopener noreferrer"
                                            className="btn btn-outline no-advance" onClick={e => e.stopPropagation()}
                                            style={{ fontSize: '0.78rem', padding: '9px 20px' }}>
                                            View on Scholar →
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ fontSize: '0.76rem', fontFamily: 'Space Grotesk', color: 'var(--text-muted)', marginTop: 20, opacity: 0.6 }}
                >
                    More research underway — exploring Quantum ML &amp; Edge AI
                </motion.p>
            </div>
        </div>
    )
}
