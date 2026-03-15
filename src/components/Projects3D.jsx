import { useState, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

const PROJECTS = [
    {
        id: 'pathfinder',
        title: 'PathFinder Pro',
        subtitle: 'AI-Powered Roadmap Generator',
        tags: ['MERN', 'AI/ML', 'Recommendation Engine'],
        color: '#06b6d4',
        icon: '🗺️',
        github: 'https://github.com/adarsh-L',
        live: null,
        problem: 'Students and professionals lack structured, personalised learning roadmaps tailored to their goals and current skill level.',
        approach: 'Built a recommendation engine using collaborative filtering and skill-gap analysis. Users complete an onboarding quiz; the engine maps skills to curated resource paths.',
        architecture: 'React frontend → Express/Node.js REST API → MongoDB Atlas → Custom ML model served via FastAPI. JWT auth, Redis caching for fast recommendations.',
        impact: 'Reduces average career-planning time by ~60%. Generates personalised roadmaps in under 2 seconds with 0 external dependencies for core logic.',
    },
    {
        id: 'lungdetect',
        title: 'Hybrid Lung Disease Detection',
        subtitle: 'AI-Powered Pulmonary Classification Model',
        tags: ['Deep Learning', 'CNN', 'Medical AI', 'PyTorch'],
        color: '#7c3aed',
        icon: '🫁',
        github: 'https://github.com/adarsh-L',
        live: null,
        problem: 'Early and accurate detection of lung diseases such as pneumonia, COVID-19, and tuberculosis remains a clinical challenge due to overlapping radiological features and limited annotated datasets.',
        approach: 'Developed a hybrid model combining CNN feature extraction with a lightweight classifier. Transfer learning on pre-trained EfficientNet backbone, fine-tuned on curated chest X-ray datasets for multi-class pulmonary disease classification.',
        architecture: 'PyTorch CNN pipeline → EfficientNet-B3 backbone → custom classification head → Flask inference API. Datasets: NIH ChestX-ray14 + Kaggle COVID-19 Radiography. Benchmarked against VGG-16 and ResNet-50 baselines.',
        impact: 'Achieved 93%+ classification accuracy with significantly reduced false-negative rate compared to classical baselines. Lightweight enough for deployment on edge medical devices.',
    },
    {
        id: 'deepsafe',
        title: 'DeepSafe',
        subtitle: 'Real-Time Deepfake Detection',
        tags: ['EfficientNet', 'MTCNN', 'Computer Vision'],
        color: '#22d3ee',
        icon: '🛡️',
        github: 'https://github.com/adarsh-L',
        live: null,
        problem: 'Deepfake media is proliferating rapidly, making it increasingly difficult to distinguish genuine from manipulated video and images.',
        approach: 'Two-stage pipeline: MTCNN for face extraction, then EfficientNet-B3 fine-tuned on FF++ dataset for manipulation classification.',
        architecture: 'Python + PyTorch inference backend, Flask API for real-time video processing. React frontend for drag-and-drop upload and result visualization.',
        impact: '91%+ detection accuracy on FaceForensics++ benchmark. Inference latency under 150ms per frame on consumer GPU.',
    },
    {
        id: 'taxpal',
        title: 'TaxPal',
        subtitle: 'MERN Tax Estimation Platform',
        tags: ['MERN', 'REST API', 'MongoDB'],
        color: '#a78bfa',
        icon: '💰',
        github: 'https://github.com/adarsh-L',
        live: null,
        problem: 'Individual taxpayers in India find ITR filing and tax bracket calculation complex and error-prone without professional CA support.',
        approach: 'Rule-based tax engine covering both old and new tax regimes. MongoDB aggregation pipelines for instant bracket calculation across income slabs.',
        architecture: 'React + Tailwind frontend → Node/Express REST API → MongoDB Atlas. Isolated tax logic module with 100% test coverage.',
        impact: 'Simplifies tax estimation for salaried professionals across India. Sub-100ms calculation response time.',
    },
]

/* ── Card tilt effect ── */
function TiltCard({ children, color, style = {} }) {
    const ref = useRef(null)

    const onMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`
        el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${color}22`
        el.style.borderColor = `${color}40`
    }, [color])

    const onLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
        el.style.boxShadow = ''
        el.style.borderColor = 'var(--border)'
    }, [])

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease', ...style }}
        >
            {children}
        </div>
    )
}

/* ── Project Modal ── */
const ProjectModal = memo(function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(16px)', position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 200 }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="scrollable"
                style={{
                    width: '100%', maxWidth: 720, maxHeight: '88vh', overflowY: 'auto',
                    background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(20px)',
                    border: `1px solid ${project.color}30`, borderRadius: 20,
                    boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${project.color}10`,
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Colour accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />

                {/* Header */}
                <div style={{
                    padding: '28px 32px 20px', display: 'flex',
                    alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 14, fontSize: '1.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `${project.color}14`, border: `1px solid ${project.color}28`, flexShrink: 0,
                        }}>
                            {project.icon}
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)' }}>
                                {project.title}
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: project.color, fontFamily: 'var(--font-mono)', marginTop: 3 }}>
                                {project.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--border)',
                        background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
                        transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#f87171'; e.currentTarget.style.color = '#f87171' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                    >✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '4px 32px 32px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>

                    {[
                        { label: 'Problem', content: project.problem },
                        { label: 'Approach', content: project.approach },
                        { label: 'Architecture', content: project.architecture },
                        { label: 'Impact', content: project.impact },
                    ].map(({ label, content }, i) => (
                        <div key={label} style={{ marginBottom: i < 3 ? 22 : 0, paddingLeft: 16, borderLeft: `2px solid ${project.color}30` }}>
                            <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: project.color, marginBottom: 6 }}>
                                {label}
                            </p>
                            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text)', opacity: 0.85 }}>
                                {content}
                            </p>
                        </div>
                    ))}

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ fontSize: '0.8rem', padding: '9px 20px' }}>
                                GitHub →
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ fontSize: '0.8rem', padding: '9px 20px' }}>
                                Live Demo ↗
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
})

/* ── Project Card ── */
const ProjectCard = memo(function ProjectCard({ project, onClick, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <TiltCard color={project.color}
                style={{
                    background: 'var(--surface)', backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border)', borderRadius: 20,
                    padding: 0, cursor: 'pointer', height: '100%', overflow: 'hidden',
                }}
            >
                {/* Colour accent top bar */}
                <div
                    style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    onClick={onClick}
                />

                <div style={{ padding: '22px 22px 20px' }} onClick={onClick}>
                    {/* Icon + title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                        <div style={{
                            width: 46, height: 46, borderRadius: 12, fontSize: '1.25rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `${project.color}12`, border: `1px solid ${project.color}28`, flexShrink: 0,
                        }}>
                            {project.icon}
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
                                {project.title}
                            </h3>
                            <p style={{ fontSize: '0.74rem', color: project.color, marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                                {project.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>

                    {/* Description */}
                    <p style={{
                        fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7,
                        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {project.problem}
                    </p>

                    {/* CTA */}
                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: project.color }}>
                        View Details →
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    )
})

export default function Projects3D() {
    const [selected, setSelected] = useState(null)

    return (
        <div className="section">
            <div className="container section-inner">

                <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>Selected Work</p>
                    <h2 className="section-title">
                        Latest <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="body-text" style={{ marginTop: 12 }}>Click any card for full architecture details</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} delay={i * 0.08} onClick={() => setSelected(p)} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </div>
    )
}
