import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.jsx'

function SunIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
}
function MoonIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
}
function MenuIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
}
function CloseIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
}

export default function Navbar({ sections }) {
    const { theme, toggle } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    /* ── scroll-spy ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const observers = []
        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
                { threshold: 0.35 }
            )
            obs.observe(el)
            observers.push(obs)
        })
        return () => observers.forEach(o => o.disconnect())
    }, [sections])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="nav-inner">

                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('home')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}
                    >
                        <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'linear-gradient(135deg, var(--purple), var(--cyan))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                            <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>AL</span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', letterSpacing: '0.01em' }}>
                            Adarsh L
                        </span>
                    </button>

                    {/* Desktop nav */}
                    <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}
                        className="nav-links-desktop">
                        {sections.map(s => (
                            <li key={s.id}>
                                <button
                                    className={`nav-link${activeSection === s.id ? ' active' : ''}`}
                                    onClick={() => scrollTo(s.id)}
                                >
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right: theme + hamburger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                            onClick={toggle}
                            aria-label="Toggle theme"
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                border: '1px solid var(--border)',
                                background: 'var(--surface)',
                                cursor: 'pointer', color: 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-glow)'; e.currentTarget.style.color = 'var(--cyan)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>

                        {/* Hamburger – mobile only */}
                        <button
                            className="nav-hamburger"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                border: '1px solid var(--border)',
                                background: 'var(--surface)', cursor: 'pointer',
                                color: 'var(--text-muted)',
                                display: 'none', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
                            background: 'rgba(11,11,15,0.97)', backdropFilter: 'blur(24px)',
                            borderBottom: '1px solid var(--border)',
                            padding: '12px 16px 20px',
                        }}
                    >
                        {sections.map(s => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                                    fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    border: activeSection === s.id ? '1px solid rgba(6,182,212,0.2)' : '1px solid transparent',
                                    background: activeSection === s.id ? 'rgba(6,182,212,0.07)' : 'transparent',
                                    color: activeSection === s.id ? 'var(--cyan)' : 'var(--text-muted)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {s.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .nav-links-desktop { display: none !important; }
                    button.nav-hamburger { display: flex !important; }
                }
            `}</style>
        </>
    )
}
