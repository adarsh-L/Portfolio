import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
    {
        id: 'pathfinder',
        title: 'PathFinder Pro',
        subtitle: 'AI-Powered Roadmap Generator',
        tags: ['MERN', 'AI/ML', 'Recommendation Engine'],
        color: '#00F7FF',
        icon: '🗺️',
        problem: 'Students and professionals lack structured, personalised learning roadmaps tailored to their goals and current skill level.',
        approach: 'Built a recommendation engine using collaborative filtering and skill-gap analysis. Users complete an onboarding quiz; the engine maps skills to curated resource paths.',
        architecture: 'React frontend → Express/Node.js REST API → MongoDB Atlas → Custom ML model served via FastAPI. JWT auth, Redis caching for fast recommendations.',
        impact: 'Reduces average career-planning time by ~60%. Generates personalised roadmaps in under 2 seconds with 0 external dependencies for core logic.',
    },
    {
        id: 'qelm',
        title: 'Quantum-Driven ELM',
        subtitle: 'Hybrid Quantum-Enhanced ML Model',
        tags: ['Quantum ML', 'ELM', 'Medical AI'],
        color: '#6366F1',
        icon: '⚛️',
        problem: 'Medical image classification suffers from overfitting and high computational cost with classical deep models, especially on small datasets.',
        approach: 'Fused Quantum Computing feature maps with Extreme Learning Machines (ELM). Quantum circuits encode spatial features; ELM trains a single-pass classifier.',
        architecture: 'PennyLane quantum circuit layer → NumPy-based ELM → Python inference server. Dataset: NIH chest X-rays. Benchmarked against classical CNN baselines.',
        impact: 'Achieved competitive accuracy with 30% less training time. Demonstrates quantum advantage in small-data medical classification tasks.',
    },
    {
        id: 'deepsafe',
        title: 'DeepSafe',
        subtitle: 'Real-Time Deepfake Detection',
        tags: ['EfficientNet', 'MTCNN', 'CV'],
        color: '#22D3EE',
        icon: '🛡️',
        problem: 'Deepfake media is proliferating rapidly, making it increasingly difficult to distinguish genuine from manipulated video and images.',
        approach: 'Two-stage pipeline: MTCNN for face extraction, then EfficientNet-B3 fine-tuned on FF++ dataset for manipulation classification. Confidence scores per frame.',
        architecture: 'Python + PyTorch inference backend, Flask API for real-time video processing. React frontend for drag-and-drop upload and result visualization.',
        impact: '91%+ detection accuracy on FaceForensics++ benchmark. Inference latency under 150ms per frame on consumer GPU. Production-ready REST API.',
    },
    {
        id: 'taxpal',
        title: 'TaxPal',
        subtitle: 'MERN Tax Estimation Platform',
        tags: ['MERN', 'REST API', 'MongoDB'],
        color: '#A78BFA',
        icon: '💰',
        problem: 'Individual taxpayers in India find ITR filing and tax bracket calculation complex and error-prone without professional CA support.',
        approach: 'Rule-based tax engine covering both old and new tax regimes. MongoDB aggregation pipelines for instant bracket calculation across income slabs.',
        architecture: 'React + Tailwind frontend → Node/Express REST API → MongoDB Atlas. Isolated tax logic module with 100% test coverage. Deployed on Render free tier.',
        impact: 'Simplifies tax estimation for salaried professionals across India with zero external API dependencies. Sub-100ms calculation response time.',
    },
]

/* ─── Project Modal ─── */
const ProjectModal = memo(function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 no-advance"
            style={{ background: 'rgba(2,6,23,0.88)', backdropFilter: 'blur(14px)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="scrollable"
                style={{
                    width: '100%', maxWidth: 700, maxHeight: '88vh', overflowY: 'auto',
                    background: 'var(--surface)', backdropFilter: 'blur(16px)',
                    border: `1px solid ${project.color}22`,
                    borderRadius: 16,
                    boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}15`
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '28px 36px 20px', borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
                    position: 'sticky', top: 0, background: 'var(--surface)', backdropFilter: 'blur(16px)', zIndex: 1,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 12, fontSize: '1.4rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `${project.color}14`, flexShrink: 0,
                        }}>
                            {project.icon}
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)' }}>
                                {project.title}
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: project.color, fontFamily: 'Space Grotesk', marginTop: 2 }}>
                                {project.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        style={{
                            width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
                            background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
                            flexShrink: 0, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4444'; e.currentTarget.style.color = '#ff4444' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                    >✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px 36px 32px' }}>
                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>

                    {/* Sections */}
                    {[
                        { label: 'Problem', content: project.problem },
                        { label: 'Approach', content: project.approach },
                        { label: 'Architecture', content: project.architecture },
                        { label: 'Impact', content: project.impact },
                    ].map(({ label, content }, i) => (
                        <div key={label} style={{ marginBottom: i < 3 ? 20 : 0, paddingLeft: 16, borderLeft: `2px solid ${project.color}35` }}>
                            <p style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.15em', color: project.color, marginBottom: 6 }}>
                                {label}
                            </p>
                            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text)', opacity: 0.84 }}>
                                {content}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
})

/* ─── Project card ─── */
const ProjectCard = memo(function ProjectCard({ project, onClick }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            onClick={onClick}
            className="card card-hover no-advance"
            style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 10, fontSize: '1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${project.color}12`, border: `1px solid ${project.color}28`, flexShrink: 0,
                }}>
                    {project.icon}
                </div>
                <div>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>{project.title}</h3>
                    <p style={{ fontSize: '0.76rem', color: project.color, marginTop: 2, fontFamily: 'Space Grotesk' }}>{project.subtitle}</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.problem}
            </p>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontFamily: 'Space Grotesk', fontWeight: 500, color: project.color }}>
                View Details →
            </div>
        </motion.div>
    )
})

export default function Projects3D() {
    const [selected, setSelected] = useState(null)

    return (
        <div className="section-wrap" style={{ background: 'var(--bg)' }}>
            <div className="container w-full">

                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                    <p className="section-eyebrow" style={{ marginBottom: 8 }}>Selected Work</p>
                    <h2 className="section-heading" style={{ marginBottom: 8 }}>
                        Latest <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="body-text" style={{ marginBottom: 36 }}>Click any card for full architecture details</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                    {PROJECTS.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                            <ProjectCard project={p} onClick={() => setSelected(p)} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </div>
    )
}
