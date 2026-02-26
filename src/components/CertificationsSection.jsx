import { motion } from 'framer-motion'

const CERTS = [
    { title: 'Cybersecurity and Ethical Hacking Internship', provider: 'Adverk', date: 'Sep 2023', icon: '🔐', color: '#00f7ff' },
    { title: 'AI-first Software Engineering & Applied Generative AI', provider: 'Infosys Springboard', date: 'Dec 2024', icon: '🤖', color: '#6366f1' },
    { title: 'Prompt Engineering and OpenAI GPT Models', provider: 'Infosys Springboard', date: 'Dec 2024', icon: '✨', color: '#6366f1' },
    { title: 'Angular Web Development', provider: 'Infosys Springboard', date: 'Sep 2025', icon: '🔺', color: '#22d3ee' },
    { title: 'MongoDB – Atlas, CRUD, Aggregation, Indexes, Data Modeling', provider: 'MongoDB, Inc.', date: 'July 2024', icon: '🍃', color: '#34d399' },
]

const LEADERSHIP = [
    { role: 'IEEE Joint Secretary', year: '2024', icon: '⚡' },
    { role: 'Volunteer – SRISHTI 2024', year: '2024', icon: '🌟' },
]

const IEEE_PUB = {
    title: 'Remote Monitoring for Water Level of Bridges and Flood Zones',
    conference: '3rd IEEE ICKECS 2025',
    desc: 'IoT-based real-time monitoring system integrating sensors, MQTT protocol, and a cloud dashboard with SMS/email alerts for flood-prone bridge zones.',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WecoMWQAAAAJ&citation_for_view=WecoMWQAAAAJ:d1gkVwhDpl0C',
}

const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: 'easeOut' } })

export default function CertificationsSection() {
    return (
        <div className="section-wrap">
            <div className="container">
                <motion.div {...fade(0)} style={{ marginBottom: 28 }}>
                    <p className="section-eyebrow" style={{ marginBottom: 8 }}>Achievements</p>
                    <h2 className="section-heading">
                        Certifications &amp; <span className="gradient-text">Publications</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

                    {/* ── Left: Certifications ── */}
                    <div>
                        <motion.p {...fade(0.1)} style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: 12 }}>
                            Certifications
                        </motion.p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {CERTS.map((c, i) => (
                                <motion.div key={c.title} {...fade(0.12 + i * 0.07)} className="card card-hover"
                                    style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}14`, border: `1px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>
                                        {c.icon}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.35 }}>
                                            {c.title}
                                        </p>
                                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                            {c.provider} &middot; <span style={{ color: c.color }}>{c.date}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Leadership */}
                        <motion.div {...fade(0.55)} style={{ marginTop: 16 }}>
                            <p style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: 10 }}>
                                Leadership
                            </p>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                {LEADERSHIP.map(l => (
                                    <div key={l.role} className="card"
                                        style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: '1rem' }}>{l.icon}</span>
                                        <div>
                                            <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text)' }}>{l.role}</p>
                                            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 1 }}>{l.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: IEEE Publication ── */}
                    <div>
                        <motion.p {...fade(0.1)} style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: 12 }}>
                            IEEE Publication
                        </motion.p>

                        <motion.div {...fade(0.18)} className="card"
                            style={{ padding: '22px', borderColor: 'rgba(0,247,255,0.18)', height: 'fit-content' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,247,255,0.1)', border: '1px solid rgba(0,247,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                    📄
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.68rem', padding: '2px 10px', borderRadius: 999, background: 'rgba(0,247,255,0.1)', border: '1px solid rgba(0,247,255,0.25)', color: 'var(--glow)', fontFamily: 'Space Grotesk', fontWeight: 500 }}>
                                        {IEEE_PUB.conference}
                                    </span>
                                </div>
                            </div>

                            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.45, marginBottom: 12 }}>
                                {IEEE_PUB.title}
                            </h3>

                            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 18 }}>
                                {IEEE_PUB.desc}
                            </p>

                            {/* Status + link */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div className="glow-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--glow)' }} />
                                    <span style={{ fontSize: '0.73rem', fontFamily: 'Space Grotesk', fontWeight: 600, color: 'var(--glow)' }}>IEEE Published</span>
                                </div>
                            </div>

                            <a href={IEEE_PUB.link} target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline no-advance"
                                onClick={e => e.stopPropagation()}
                                style={{ fontSize: '0.78rem', padding: '9px 20px' }}>
                                View on Scholar →
                            </a>
                        </motion.div>

                        {/* Stat cards */}
                        <motion.div {...fade(0.32)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                            {[
                                { value: '5+', label: 'Certifications' },
                                { value: '1', label: 'IEEE Paper' },
                                { value: '2', label: 'Leadership' },
                                { value: '4+', label: 'Projects' },
                            ].map(s => (
                                <div key={s.label} className="card" style={{ padding: '14px', textAlign: 'center' }}>
                                    <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', background: 'linear-gradient(90deg,var(--glow),var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 3, fontFamily: 'Space Grotesk' }}>{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
