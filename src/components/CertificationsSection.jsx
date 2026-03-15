import { motion } from 'framer-motion'

const CERTS = [
    { title: 'Cybersecurity and Ethical Hacking Internship', provider: 'Adverk', date: 'Sep 2023', icon: '🔐', color: '#06b6d4' },
    { title: 'AI-first Software Engineering & Applied Generative AI', provider: 'Infosys Springboard', date: 'Dec 2024', icon: '🤖', color: '#7c3aed' },
    { title: 'Prompt Engineering and OpenAI GPT Models', provider: 'Infosys Springboard', date: 'Dec 2024', icon: '✨', color: '#7c3aed' },
    { title: 'Angular Web Development', provider: 'Infosys Springboard', date: 'Sep 2025', icon: '🔺', color: '#22d3ee' },
    { title: 'MongoDB – Atlas, CRUD, Aggregation, Indexes, Data Modeling', provider: 'MongoDB, Inc.', date: 'Jul 2024', icon: '🍃', color: '#34d399' },
]

const LEADERSHIP = [
    { role: 'IEEE Joint Secretary', year: '2024', icon: '⚡', color: '#06b6d4' },
    { role: 'Volunteer – SRISHTI 2024', year: '2024', icon: '🌟', color: '#a855f7' },
]

const IEEE_PUB = {
    title: 'Remote Monitoring for Water Level of Bridges and Flood Zones',
    conference: '3rd IEEE ICKECS 2025',
    desc: 'IoT-based real-time monitoring system integrating sensors, MQTT protocol, and a cloud dashboard with SMS/email alerts for flood-prone bridge zones.',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WecoMWQAAAAJ&citation_for_view=WecoMWQAAAAJ:d1gkVwhDpl0C',
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

export default function CertificationsSection() {
    return (
        <div className="section">
            <div className="container section-inner">

                <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>Achievements</p>
                    <h2 className="section-title">
                        Certifications &amp; <span className="gradient-text">Publications</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

                    {/* Left: Certifications */}
                    <div>
                        <motion.p {...fadeUp(0.06)} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 16 }}>
                            Certifications
                        </motion.p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {CERTS.map((c, i) => (
                                <motion.div
                                    key={c.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: 0.08 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="glass"
                                    style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}35`; e.currentTarget.style.boxShadow = `0 8px 30px ${c.color}12` }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
                                >
                                    {/* Color left accent */}
                                    <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: c.color, flexShrink: 0, marginTop: 2 }} />

                                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `${c.color}14`, border: `1px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                                        {c.icon}
                                    </div>

                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.4 }}>
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
                        <motion.div {...fadeUp(0.5)} style={{ marginTop: 28 }}>
                            <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 14 }}>
                                Leadership
                            </p>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                {LEADERSHIP.map(l => (
                                    <div key={l.role} className="glass" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: '1.1rem' }}>{l.icon}</span>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text)' }}>{l.role}</p>
                                            <p style={{ fontSize: '0.68rem', color: l.color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{l.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: IEEE Publication + stats */}
                    <div>
                        <motion.p {...fadeUp(0.06)} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 16 }}>
                            IEEE Publication
                        </motion.p>

                        <motion.div
                            {...fadeUp(0.14)}
                            className="glass"
                            style={{ padding: '24px', borderColor: 'rgba(6,182,212,0.15)', marginBottom: 16 }}
                        >
                            {/* Conference badge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                    📄
                                </div>
                                <span style={{ fontSize: '0.68rem', padding: '3px 12px', borderRadius: 999, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                                    {IEEE_PUB.conference}
                                </span>
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.45, marginBottom: 12 }}>
                                {IEEE_PUB.title}
                            </h3>
                            <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 20 }}>
                                {IEEE_PUB.desc}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                                <div className="glow-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)' }} />
                                <span style={{ fontSize: '0.73rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--cyan)' }}>IEEE Published</span>
                            </div>

                            <a href={IEEE_PUB.link} target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '9px 20px', display: 'inline-flex' }}>
                                View on Scholar →
                            </a>
                        </motion.div>

                        {/* Stat chips */}
                        <motion.div {...fadeUp(0.26)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[
                                { value: '5+', label: 'Certifications' },
                                { value: '1', label: 'IEEE Paper' },
                                { value: '2', label: 'Leadership' },
                                { value: '4+', label: 'Projects' },
                            ].map(s => (
                                <div key={s.label} className="glass" style={{ padding: '16px', textAlign: 'center' }}>
                                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 6 }}>
                                        {s.value}
                                    </p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .certs-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}
