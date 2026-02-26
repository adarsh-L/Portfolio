import { useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Skill icon (emoji fallback — no CDN dependency) ─── */
const ICON_MAP = {
    'Python': '🐍', 'C/C++': '⚙', 'Java': '☕', 'JavaScript': '🟨', 'SQL': '🗄',
    'NumPy': '🔢', 'Pandas': '🐼', 'Matplotlib': '📊', 'Scikit-learn': '🤖',
    'TensorFlow': '🧠', 'Keras': '🔵',
    'MongoDB': '🍃', 'Express.js': '🚂', 'React.js': '⚛', 'Node.js': '🟩',
    'REST API Development': '🔌', 'Responsive UI Design': '📱',
    'MySQL': '🐬', 'RDBMS Concepts': '🗂', 'Query Optimization': '⚡',
    'Git': '🌿', 'GitHub': '🐙', 'VS Code': '💻', 'Postman': '📬',
    'Jupyter Notebook': '📓', 'Google Colab': '🌐', 'Docker': '🐳',
    'Debugging': '🐛', 'Code Optimization': '🚀', 'Version Control': '🔀',
    'Agile Methodology': '🔄', 'Problem Solving': '🧩',
}

const CATEGORIES = [
    {
        name: 'Programming Languages',
        color: '#00f7ff',
        items: ['Python', 'C/C++', 'Java', 'JavaScript', 'SQL'],
    },
    {
        name: 'Libraries & Frameworks',
        color: '#6366f1',
        items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'Keras'],
    },
    {
        name: 'Web Development',
        color: '#22d3ee',
        items: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API Development', 'Responsive UI Design'],
    },
    {
        name: 'Databases',
        color: '#a78bfa',
        items: ['MongoDB', 'MySQL', 'RDBMS Concepts', 'Query Optimization'],
    },
    {
        name: 'Tools & Platforms',
        color: '#34d399',
        items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jupyter Notebook', 'Google Colab', 'Docker'],
    },
    {
        name: 'Development Practices',
        color: '#fb923c',
        items: ['Debugging', 'Code Optimization', 'Version Control', 'Agile Methodology', 'Problem Solving'],
    },
]

function SkillChip({ label, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            className="skill-chip no-advance"
            style={{ '--chip-color': color }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}45`
                e.currentTarget.style.boxShadow = `0 6px 18px ${color}22`
                e.currentTarget.style.color = color
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.color = 'var(--text)'
            }}
        >
            <span style={{ fontSize: '1rem' }}>{ICON_MAP[label] || '◆'}</span>
            {label}
        </motion.div>
    )
}

export default function SkillsSection() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="section-wrap">
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                    <p className="section-eyebrow" style={{ marginBottom: 8 }}>What I work with</p>
                    <h2 className="section-heading" style={{ marginBottom: 32 }}>
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                </motion.div>

                {/* Category tabs */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
                    className="no-advance"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}
                >
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={cat.name}
                            className="no-advance"
                            onClick={(e) => { e.stopPropagation(); setActiveTab(i) }}
                            style={{
                                padding: '7px 16px', borderRadius: 8, fontFamily: 'Space Grotesk', fontSize: '0.78rem', fontWeight: 500,
                                cursor: 'pointer', transition: 'all 0.22s ease', border: 'none',
                                background: activeTab === i ? cat.color : 'var(--bg-card)',
                                color: activeTab === i ? '#fff' : 'var(--text-muted)',
                                backdropFilter: 'blur(8px)',
                                boxShadow: activeTab === i ? `0 0 16px ${cat.color}40` : 'none',
                                borderLeft: activeTab === i ? `3px solid ${cat.color}` : '3px solid transparent',
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Active category chip grid */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="card"
                    style={{ padding: '28px 24px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 4, height: 20, borderRadius: 2, background: CATEGORIES[activeTab].color }} />
                        <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>
                            {CATEGORIES[activeTab].name}
                        </h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {CATEGORIES[activeTab].items.map((item, j) => (
                            <SkillChip key={item} label={item} color={CATEGORIES[activeTab].color} delay={j * 0.05} />
                        ))}
                    </div>
                </motion.div>

                {/* All categories compact summary */}
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ fontSize: '0.76rem', fontFamily: 'Space Grotesk', color: 'var(--text-muted)', marginTop: 18, opacity: 0.6 }}
                >
                    {CATEGORIES.length} categories · {CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)} total skills — click tabs to explore
                </motion.p>
            </div>
        </div>
    )
}
