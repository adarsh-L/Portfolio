import { motion } from 'framer-motion'

/* ─── Hexagon with real profile image ─── */
function HexAvatar({ size = 240 }) {
    return (
        <div className="float-y flex-shrink-0" style={{ width: size, height: size * 1.1 }}>
            <div className="hex-border" style={{ width: '100%', height: '100%' }}>
                <div className="hex-inner" style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/images/profile.jpg"
                        alt="Adarsh L"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
                        }}
                        onError={(e) => {
                            /* Graceful fallback if image not found */
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.innerHTML = `
                <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);background:#111827;">
                  <span style="font-size:3.5rem;font-weight:700;font-family:Space Grotesk,sans-serif;background:linear-gradient(135deg,#00f7ff,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AL</span>
                </div>`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const EDUCATION = [
    {
        college: 'Atria Institute of Technology',
        course: 'B.E Computer Science & Design',
        duration: '2022 – 2026',
    },
    {
        college: 'PES PU College',
        course: 'CLASS 12 – PCMB',
        duration: '2020 – 2022',
    },
]

const fade = (d = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d, duration: 0.55, ease: 'easeOut' },
})

export default function AboutSection() {
    return (
        <div className="section-wrap">
            <div className="container">

                {/* Responsive two-column grid */}
                <div className="about-grid">

                    {/* Avatar – centered on mobile, left-aligned on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <HexAvatar size={220} />
                    </motion.div>

                    {/* Right: content */}
                    <div>
                        <motion.h2 {...fade(0)} className="section-heading" style={{ marginBottom: 6 }}>
                            About <span className="gradient-text">Me</span>
                        </motion.h2>
                        <motion.p {...fade(0.06)} style={{ fontSize: '0.85rem', fontFamily: 'Space Grotesk', color: 'var(--glow)', marginBottom: 18 }}>
                            AI Engineer
                        </motion.p>

                        {/* Description */}
                        <motion.p {...fade(0.12)} className="body-text" style={{ marginBottom: 32 }}>
                            Software Engineering enthusiast with strong foundations in Data Structures,
                            Algorithms, OOP and DBMS. Experienced in building scalable full-stack applications
                            and AI-powered systems. IEEE Published Researcher exploring Quantum ML and Edge AI.
                        </motion.p>

                        {/* Education */}
                        <motion.div {...fade(0.2)}>
                            <p style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 12 }}>
                                Education
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {EDUCATION.map((e) => (
                                    <div key={e.college} className="card"
                                        style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>
                                                {e.college}
                                            </p>
                                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                                {e.course}
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: 'var(--glow)', fontFamily: 'Space Grotesk', fontWeight: 600, flexShrink: 0, marginTop: 2 }}>
                                            {e.duration}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
