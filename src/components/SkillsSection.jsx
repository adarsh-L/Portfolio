import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

/* ── All skills data ── */
const CATEGORIES = [
    {
        name: 'Languages',
        color: '#06b6d4',
        items: [
            { label: 'Python', icon: '🐍' },
            { label: 'JavaScript', icon: '🟨' },
            { label: 'C/C++', icon: '⚙️' },
            { label: 'Java', icon: '☕' },
            { label: 'SQL', icon: '🗄️' },
        ],
    },
    {
        name: 'AI / ML',
        color: '#a855f7',
        items: [
            { label: 'TensorFlow', icon: '🧠' },
            { label: 'Scikit-learn', icon: '🤖' },
            { label: 'PyTorch', icon: '🔥' },
            { label: 'NumPy', icon: '🔢' },
            { label: 'Pandas', icon: '🐼' },
            { label: 'Keras', icon: '🔵' },
        ],
    },
    {
        name: 'Web Dev',
        color: '#22d3ee',
        items: [
            { label: 'React.js', icon: '⚛️' },
            { label: 'Node.js', icon: '🟩' },
            { label: 'Express.js', icon: '🚂' },
            { label: 'MongoDB', icon: '🍃' },
            { label: 'REST APIs', icon: '🔌' },
        ],
    },
    {
        name: 'Databases',
        color: '#34d399',
        items: [
            { label: 'MongoDB', icon: '🍃' },
            { label: 'MySQL', icon: '🐬' },
            { label: 'Redis', icon: '♦️' },
            { label: 'Query Opt.', icon: '⚡' },
        ],
    },
    {
        name: 'Tools',
        color: '#fb923c',
        items: [
            { label: 'Git', icon: '🌿' },
            { label: 'Docker', icon: '🐳' },
            { label: 'Postman', icon: '📬' },
            { label: 'VS Code', icon: '💻' },
            { label: 'Jupyter', icon: '📓' },
            { label: 'Colab', icon: '🌐' },
        ],
    },
]

/* ──────────────────────────────────────────────
   CSS 3D Orbit Ring component
   Each ring rotates on a tilted X axis.
   Items counter-rotate to stay upright.
─────────────────────────────────────────────── */
function OrbitRing({ items, radius, duration, color, delay = 0 }) {
    const [paused, setPaused] = useState(false)
    const [tooltip, setTooltip] = useState(null)
    const ringRef = useRef(null)

    const angleStep = 360 / items.length

    return (
        <div
            ref={ringRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); setTooltip(null) }}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                border: `1px solid ${color}22`,
                animationName: 'orbit-spin',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: paused ? 'paused' : 'running',
                animationDelay: `${delay}s`,
                transformOrigin: 'center center',
                transform: 'translate(-50%, -50%) rotateX(62deg)',
            }}
        >
            {items.map((item, i) => {
                const angle = angleStep * i
                const rad = (angle * Math.PI) / 180
                const x = Math.cos(rad) * radius + radius
                const y = Math.sin(rad) * radius + radius

                return (
                    <div
                        key={item.label}
                        onMouseEnter={() => setTooltip(item.label)}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            animationName: 'orbit-counter',
                            animationDuration: `${duration}s`,
                            animationTimingFunction: 'linear',
                            animationIterationCount: 'infinite',
                            animationPlayState: paused ? 'paused' : 'running',
                            animationDelay: `${delay}s`,
                        }}
                    >
                        <div style={{
                            background: 'rgba(11,11,15,0.85)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${color}33`,
                            borderRadius: 999,
                            padding: '4px 11px',
                            fontSize: '0.67rem',
                            fontFamily: 'var(--font-mono)',
                            color: tooltip === item.label ? color : 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            transform: 'translate(-50%, -50%)',
                            transition: 'all 0.2s ease',
                            boxShadow: tooltip === item.label ? `0 0 14px ${color}44` : 'none',
                            cursor: 'default',
                        }}>
                            {item.icon} {item.label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default function SkillsSection() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="section">
            <div className="container section-inner">

                <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>Expertise</p>
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="body-text" style={{ marginTop: 12, maxWidth: 480 }}>
                        Hover over the orbit to pause and explore individual skills.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 48,
                    alignItems: 'center',
                }}>
                    {/* 3D Orbit visualization */}
                    <motion.div {...fadeUp(0.1)} style={{ position: 'relative', height: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Orbit rings */}
                        <OrbitRing items={CATEGORIES[0].items} radius={100} duration={18} color={CATEGORIES[0].color} delay={0} />
                        <OrbitRing items={CATEGORIES[1].items} radius={148} duration={28} color={CATEGORIES[1].color} delay={-5} />
                        <OrbitRing items={CATEGORIES[2].items} radius={192} duration={38} color={CATEGORIES[2].color} delay={-12} />

                        {/* Central node */}
                        <div style={{
                            position: 'absolute',
                            width: 80, height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--purple), var(--cyan))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            fontSize: '0.72rem', color: '#fff',
                            boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(6,182,212,0.15)',
                            letterSpacing: '0.04em',
                            zIndex: 10,
                        }}>
                            SKILLS
                        </div>
                    </motion.div>

                    {/* Category tabs + chip grid */}
                    <motion.div {...fadeUp(0.18)}>
                        {/* Tab buttons */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                            {CATEGORIES.map((cat, i) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveTab(i)}
                                    style={{
                                        padding: '6px 16px', borderRadius: 999,
                                        fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
                                        cursor: 'pointer', border: 'none',
                                        background: activeTab === i ? cat.color : 'var(--surface)',
                                        color: activeTab === i ? '#fff' : 'var(--text-muted)',
                                        transition: 'all 0.2s ease',
                                        boxShadow: activeTab === i ? `0 0 16px ${cat.color}50` : 'none',
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Active category chips */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="glass"
                            style={{ padding: '24px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                                <div style={{ width: 3, height: 18, borderRadius: 2, background: CATEGORIES[activeTab].color }} />
                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                                    {CATEGORIES[activeTab].name}
                                </h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {CATEGORIES[activeTab].items.map((item, j) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: j * 0.05, duration: 0.3 }}
                                        className="skill-chip"
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = `${CATEGORIES[activeTab].color}45`
                                            e.currentTarget.style.color = CATEGORIES[activeTab].color
                                            e.currentTarget.style.boxShadow = `0 4px 16px ${CATEGORIES[activeTab].color}22`
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'var(--border)'
                                            e.currentTarget.style.color = 'var(--text)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.95rem' }}>{item.icon}</span>
                                        {item.label}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <p style={{
                            marginTop: 14, fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
                            opacity: 0.55,
                        }}>
                            {CATEGORIES.length} categories · {CATEGORIES.reduce((s, c) => s + c.items.length, 0)} skills total
                        </p>
                    </motion.div>
                </div>

                {/* Bottom row: remaining categories */}
                <motion.div {...fadeUp(0.3)} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 16,
                    marginTop: 48,
                }}>
                    {CATEGORIES.slice(3).map(cat => (
                        <div key={cat.name} className="glass" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>{cat.name}</p>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {cat.items.map(item => (
                                    <span key={item.label} style={{
                                        fontSize: '0.68rem', padding: '3px 10px', borderRadius: 999,
                                        background: `${cat.color}12`, border: `1px solid ${cat.color}25`,
                                        color: cat.color, fontFamily: 'var(--font-mono)',
                                    }}>
                                        {item.icon} {item.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .skills-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}
