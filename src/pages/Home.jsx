import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import HeroScene from '../components/HeroScene.jsx'
import AboutSection from '../components/AboutSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import CertificationsSection from '../components/CertificationsSection.jsx'
import Projects3D from '../components/Projects3D.jsx'
import ContactSection from '../components/ContactSection.jsx'

const SECTIONS = [
    { id: 'home', label: 'Home', Component: HeroScene },
    { id: 'about', label: 'About', Component: AboutSection },
    { id: 'skills', label: 'Skills', Component: SkillsSection },
    { id: 'certifications', label: 'Certifications', Component: CertificationsSection },
    { id: 'projects', label: 'Projects', Component: Projects3D },
    { id: 'contact', label: 'Contact', Component: ContactSection },
]

const makeVariants = (dir) => ({
    initial: { x: dir > 0 ? '100%' : '-100%', opacity: 0 },
    animate: { x: '0%', opacity: 1 },
    exit: { x: dir > 0 ? '-100%' : '100%', opacity: 0 },
})
const transition = { duration: 0.6, ease: [0.76, 0, 0.24, 1] }

function CursorGlow() {
    const ref = useRef(null)
    useEffect(() => {
        const move = (e) => {
            if (ref.current) { ref.current.style.left = `${e.clientX}px`; ref.current.style.top = `${e.clientY}px` }
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])
    return <div ref={ref} className="cursor-glow" />
}

function SectionDots({ current, total, onDotClick }) {
    return (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
            {Array.from({ length: total }, (_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); onDotClick(i) }}
                    style={{
                        width: i === current ? 8 : 6, height: i === current ? 8 : 6,
                        borderRadius: '50%',
                        background: i === current ? 'var(--glow)' : 'rgba(255,255,255,0.2)',
                        boxShadow: i === current ? '0 0 10px var(--glow)' : 'none',
                        transition: 'all 0.3s ease', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                    aria-label={SECTIONS[i].label}
                />
            ))}
        </div>
    )
}

export default function Home() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const animating = useRef(false)

    const goTo = useCallback((idx) => {
        if (animating.current || idx === current || idx < 0 || idx >= SECTIONS.length) return
        animating.current = true
        setDirection(idx > current ? 1 : -1)
        setCurrent(idx)
        setTimeout(() => { animating.current = false }, 700)
    }, [current])

    const goNext = useCallback(() => goTo(current + 1), [current, goTo])
    const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

    const handleClick = useCallback((e) => {
        const blocked = e.target.closest('button, a, input, [role="button"], .no-advance, canvas, select, .modal-overlay')
        if (blocked) return
        goNext()
    }, [goNext])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goNext, goPrev])

    const { Component } = SECTIONS[current]

    return (
        <div className="relative w-full h-full overflow-hidden" onClick={handleClick}>
            <CursorGlow />
            <Navbar sections={SECTIONS} current={current} onNavigate={goTo} />

            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={SECTIONS[current].id}
                    variants={makeVariants(direction)}
                    initial="initial" animate="animate" exit="exit"
                    transition={transition}
                    className="section-viewport"
                >
                    <Component onNext={goNext} onPrev={goPrev} onNavigate={goTo} />
                </motion.div>
            </AnimatePresence>

            <SectionDots current={current} total={SECTIONS.length} onDotClick={goTo} />

            {/* Progress indicator */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center gap-3">
                <div style={{ height: 1, width: 28, background: 'var(--border)' }} />
                <span style={{ fontSize: '0.68rem', fontFamily: 'Space Grotesk', letterSpacing: '0.14em', color: 'var(--text-muted)', opacity: 0.65 }}>
                    {String(current + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
                </span>
                <div style={{ height: 1, width: 28, background: 'var(--border)' }} />
            </div>
        </div>
    )
}
