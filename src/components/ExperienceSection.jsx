import { motion } from 'framer-motion'

const EXPERIENCE = [
    {
        role: 'GenAI Intern',
        company: "Learner's Byte",
        duration: 'Ongoing',
        color: '#06b6d4',
        description: 'Working as a Generative AI intern, building and integrating large language model (LLM) based features, prompt engineering pipelines, and AI-powered product workflows. Contributing to real-world GenAI applications across the product stack.',
        skills: ['GenAI', 'LLMs', 'Prompt Engineering', 'Python', 'API Integration'],
    },
    {
        role: 'Full Stack Developer Intern',
        company: 'Infosys Springboard',
        duration: 'Nov 2025 – Jan 2026',
        color: '#7c3aed',
        description: 'Completed a structured full-stack development internship under Infosys Springboard, building end-to-end web applications using the MERN stack. Worked on REST API design, MongoDB schema modelling, React UI components, and deployment workflows. Gained exposure to enterprise engineering standards and agile practices.',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'Agile'],
    },
    {
        role: 'Cybersecurity & Ethical Hacking Intern',
        company: 'Adverk Technologies',
        duration: 'Sep 2023',
        color: '#22d3ee',
        description: 'Participated in a structured cybersecurity internship covering penetration testing fundamentals, ethical hacking methodologies, vulnerability assessment, and network security. Gained hands-on exposure to common attack vectors and defensive countermeasures in real-world environments.',
        skills: ['Pen Testing', 'Network Security', 'Ethical Hacking', 'Linux', 'Vulnerability Assessment'],
    },
    {
        role: 'IEEE Joint Secretary',
        company: 'IEEE Student Chapter – Atria Institute',
        duration: '2024',
        color: '#22d3ee',
        description: 'Served as Joint Secretary for the IEEE student chapter, organizing technical events, workshops, and the SRISHTI 2024 tech fest. Coordinated between faculty advisors and student members to drive technical community engagement and knowledge sharing.',
        skills: ['Leadership', 'Event Management', 'IEEE', 'Community'],
    },
]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

export default function ExperienceSection() {
    return (
        <div className="section">
            <div className="container section-inner">

                <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>My Journey</p>
                    <h2 className="section-title">
                        Experience &amp; <span className="gradient-text">Leadership</span>
                    </h2>
                </motion.div>

                {/* Responsive grid: timeline left, highlights right */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 48,
                    alignItems: 'start',
                }}>

                    {/* Timeline */}
                    <div className="timeline">
                        {EXPERIENCE.map((item, i) => (
                            <motion.div
                                key={item.role}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="timeline-item"
                            >
                                {/* Glowing dot */}
                                <div className="timeline-dot glow-pulse" style={{
                                    background: `linear-gradient(135deg, ${item.color}, var(--purple))`,
                                    boxShadow: `0 0 14px ${item.color}60`,
                                }} />

                                <div className="glass" style={{ padding: '20px 22px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                                        <div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
                                                {item.role}
                                            </h3>
                                            <p style={{ fontSize: '0.8rem', color: item.color, fontFamily: 'var(--font-mono)', marginTop: 3 }}>
                                                {item.company}
                                            </p>
                                        </div>
                                        <span style={{
                                            fontSize: '0.68rem', padding: '3px 10px', borderRadius: 999,
                                            background: `${item.color}12`, border: `1px solid ${item.color}25`,
                                            color: item.color, fontFamily: 'var(--font-mono)', flexShrink: 0,
                                        }}>
                                            {item.duration}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                        {item.description}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                                        {item.skills.map(s => (
                                            <span key={s} style={{
                                                fontSize: '0.65rem', padding: '3px 9px', borderRadius: 999,
                                                background: `${item.color}10`, border: `1px solid ${item.color}22`,
                                                color: item.color, fontFamily: 'var(--font-mono)',
                                            }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: sticky highlights panel */}
                    <motion.div {...fadeUp(0.2)} style={{ position: 'sticky', top: 100 }}>
                        {/* IEEE Publication card */}
                        <div className="glass" style={{ padding: '28px', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10,
                                    background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                                }}>
                                    📄
                                </div>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>IEEE Publication</p>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>3rd ICKECS 2025</p>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 18 }}>
                                Remote Monitoring for Water Level of Bridges and Flood Zones — IoT-based real-time monitoring system integrating sensors, MQTT protocol, and cloud dashboard with SMS/email alerts.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                                <div className="glow-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)' }} />
                                <span style={{ fontSize: '0.73rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--cyan)' }}>IEEE Published</span>
                            </div>
                            <a
                                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WecoMWQAAAAJ&citation_for_view=WecoMWQAAAAJ:d1gkVwhDpl0C"
                                target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ fontSize: '0.78rem', padding: '9px 20px', display: 'inline-flex' }}
                            >
                                View on Scholar →
                            </a>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[
                                { value: '3+', label: 'Years Active' },
                                { value: '4+', label: 'Projects' },
                                { value: '1', label: 'IEEE Paper' },
                                { value: '2', label: 'Leadership Roles' },
                            ].map(s => (
                                <div key={s.label} className="glass" style={{ padding: '16px', textAlign: 'center' }}>
                                    <p style={{
                                        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem',
                                        background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    }}>
                                        {s.value}
                                    </p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    #experience .section-inner > div:last-child {
                        grid-template-columns: 1fr !important;
                    }
                    #experience .section-inner > div:last-child > div:last-child {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
            `}</style>
        </div>
    )
}
