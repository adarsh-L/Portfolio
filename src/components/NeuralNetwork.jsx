import { useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
    { id: 'ai', label: 'Artificial Intelligence', icon: '🧠', desc: 'Deep learning, neural nets, model training', color: '#00F7FF', x: 50, y: 18 },
    { id: 'ml', label: 'Machine Learning', icon: '📈', desc: 'Supervised, unsupervised, RL', color: '#6366F1', x: 16, y: 44 },
    { id: 'backend', label: 'Backend Systems', icon: '⚙️', desc: 'REST APIs, Node.js, Python FastAPI', color: '#22D3EE', x: 82, y: 40 },
    { id: 'mern', label: 'MERN Stack', icon: '🌐', desc: 'MongoDB, Express, React, Node.js', color: '#A78BFA', x: 30, y: 68 },
    { id: 'sysdesign', label: 'System Design', icon: '🏗️', desc: 'Scalable arch, microservices, cloud', color: '#34D399', x: 70, y: 68 },
    { id: 'dsa', label: 'DSA', icon: '🔢', desc: 'Data Structures, Algorithms, problem solving', color: '#FB923C', x: 50, y: 50 },
]

const EDGES = [
    ['ai', 'ml'], ['ai', 'dsa'], ['ml', 'dsa'], ['dsa', 'mern'],
    ['dsa', 'backend'], ['mern', 'backend'], ['backend', 'sysdesign'], ['mern', 'sysdesign'],
]

const SKILL_CATS = [
    { label: 'AI / ML', chips: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'] },
    { label: 'Backend', chips: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
    { label: 'Core CS', chips: ['DSA', 'OOP', 'DBMS', 'System Design'] },
]

function getPos(id) { return SKILLS.find(s => s.id === id) }

export default function NeuralNetwork() {
    const [hovered, setHovered] = useState(null)

    return (
        <div
            className="w-full min-h-screen flex items-center"
            style={{ background: 'linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%)' }}
        >
            <div className="w-full max-w-screen-xl mx-auto px-16 py-28">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="section-subtitle mb-3">Neural Architecture</p>
                    <h2 className="section-title">Core <span className="gradient-text">Skill Matrix</span></h2>
                    <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        Hover nodes to explore — arrows or click to navigate
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

                    {/* SVG Network */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                        className="relative w-full" style={{ paddingBottom: '58%' }}
                    >
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            {EDGES.map(([a, b]) => {
                                const pa = getPos(a), pb = getPos(b)
                                const hl = hovered === a || hovered === b
                                return (
                                    <line key={`${a}-${b}`}
                                        x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                                        stroke={hl ? '#00F7FF' : 'rgba(255,255,255,0.07)'}
                                        strokeWidth={hl ? 0.45 : 0.22}
                                        strokeDasharray={hl ? 'none' : '1.2 2'}
                                        style={{ transition: 'all 0.3s ease' }}
                                    />
                                )
                            })}
                        </svg>

                        {SKILLS.map(skill => (
                            <div
                                key={skill.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                                onMouseEnter={() => setHovered(skill.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <motion.div whileHover={{ scale: 1.18 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                                    className="relative cursor-pointer no-advance">
                                    {hovered === skill.id && (
                                        <motion.div
                                            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1.5, opacity: 0.25 }}
                                            className="absolute inset-0 rounded-full"
                                            style={{ background: skill.color, filter: 'blur(10px)' }}
                                        />
                                    )}
                                    <div
                                        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center glass"
                                        style={{
                                            borderColor: hovered === skill.id ? skill.color : 'var(--border)',
                                            boxShadow: hovered === skill.id ? `0 0 18px ${skill.color}55` : 'none',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <span className="text-xl">{skill.icon}</span>
                                    </div>

                                    {hovered === skill.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 glass rounded-xl p-3 z-20 pointer-events-none no-advance"
                                            style={{ borderColor: `${skill.color}40` }}
                                        >
                                            <p className="font-['Space_Grotesk'] font-semibold text-xs mb-1" style={{ color: skill.color }}>{skill.label}</p>
                                            <p className="text-[0.65rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{skill.desc}</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                                <p className="text-center text-[0.6rem] font-['Space_Grotesk'] mt-1 whitespace-nowrap"
                                    style={{ color: hovered === skill.id ? skill.color : 'var(--text-muted)', transition: 'color 0.3s' }}>
                                    {skill.label.split(' ')[0]}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Skill categories panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                        className="flex flex-col gap-5"
                    >
                        {SKILL_CATS.map(cat => (
                            <div key={cat.label} className="glass rounded-2xl p-5">
                                <p className="text-xs font-['Space_Grotesk'] uppercase tracking-widest mb-3"
                                    style={{ color: 'var(--glow-cyan)', opacity: 0.7 }}>
                                    {cat.label}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {cat.chips.map(c => <span key={c} className="tag-chip">{c}</span>)}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
