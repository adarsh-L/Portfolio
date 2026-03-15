import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

/* ── Hexagon Avatar ── */
function HexAvatar({ size = 240 }) {
    return (
        <div className="float-y flex-shrink-0" style={{ position: 'relative', width: size, height: size * 1.1 }}>
            <div style={{
                position: 'absolute', inset: -16,
                background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(16px)',
            }} />
            <div className="hex-border" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 24px rgba(124,58,237,0.35))' }}>
                <div className="hex-inner" style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/images/profile.jpg"
                        alt="Adarsh L"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)' }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.2));"><span style="font-size:3.5rem;font-weight:800;font-family:Syne,sans-serif;background:linear-gradient(135deg,#a855f7,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AL</span></div>`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const EDUCATION = [
    { college: 'Atria Institute of Technology', course: 'B.E Computer Science & Design', duration: '2022 – 2026' },
    { college: 'PES PU College', course: 'CLASS 12 – PCMB', duration: '2020 – 2022' },
]

const STATS = [
    { value: '4+', label: 'Projects Built' },
    { value: '1', label: 'IEEE Paper' },
    { value: '5+', label: 'Certifications' },
    { value: '3+ yrs', label: 'CS Journey' },
]

export default function AboutSection() {
    return (
        <div className="section">
            <div className="container section-inner">

                {/* Header */}
                <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>Who I Am</p>
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </motion.div>

                {/* Two columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 64,
                    alignItems: 'start',
                }}>
                    {/* Avatar */}
                    <motion.div {...fadeUp(0.1)} style={{ display: 'flex', justifyContent: 'center' }}>
                        <HexAvatar size={220} />
                    </motion.div>

                    {/* Content */}
                    <div>
                        <motion.p {...fadeUp(0)} style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 500,
                            fontSize: '0.82rem',
                            color: 'var(--cyan)',
                            marginBottom: 18,
                            letterSpacing: '0.01em',
                        }}>
                            AI Engineer & IEEE Published Researcher
                        </motion.p>

                        <motion.p {...fadeUp(0.08)} className="body-text" style={{ marginBottom: 20, maxWidth: 560 }}>
                            Software Engineering enthusiast with strong foundations in Data Structures,
                            Algorithms, OOP, and DBMS. Experienced in building scalable full-stack applications
                            and AI-powered systems. IEEE Published Researcher exploring Quantum ML and Edge AI.
                        </motion.p>

                        <motion.p {...fadeUp(0.14)} className="body-text" style={{ marginBottom: 36, maxWidth: 560 }}>
                            Passionate about bridging research and production — from designing neural networks
                            to shipping MERN stack applications. Always seeking complex problems at the intersection
                            of AI and systems engineering.
                        </motion.p>

                        {/* Education */}
                        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 14 }}>
                                Education
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {EDUCATION.map(e => (
                                    <div key={e.college} className="glass"
                                        style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>
                                                {e.college}
                                            </p>
                                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                                {e.course}
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '0.76rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontWeight: 500, flexShrink: 0 }}>
                                            {e.duration}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats row */}
                <motion.div {...fadeUp(0.28)} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16,
                    marginTop: 48,
                }}>
                    {STATS.map(s => (
                        <div key={s.label} className="glass" style={{ padding: '20px 16px', textAlign: 'center' }}>
                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: '1.6rem',
                                background: 'var(--grad-text)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1,
                                marginBottom: 6,
                            }}>
                                {s.value}
                            </p>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Mobile fixes */}
            <style>{`
                @media (max-width: 768px) {
                    .about-cols { grid-template-columns: 1fr !important; text-align: center; }
                    .about-stats { grid-template-columns: repeat(2,1fr) !important; }
                }
            `}</style>
        </div>
    )
}
