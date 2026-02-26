import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.jsx'

function SunIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none" /></svg> }
function MoonIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> }
function MenuIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg> }
function CloseIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> }

export default function Navbar({ sections, current, onNavigate }) {
    const { theme, toggle } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = (i) => {
        onNavigate(i)
        setMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50"
                style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
            >
                <div style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: 24, paddingRight: 24, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <button className="no-advance" onClick={(e) => { e.stopPropagation(); handleNav(0) }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, var(--glow), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: '#fff', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>AL</span>
                        </div>
                        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', letterSpacing: '0.02em' }}>Adarsh L</span>
                    </button>

                    {/* Desktop nav links */}
                    <ul className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
                        {sections.map((s, i) => {
                            const active = i === current
                            return (
                                <li key={s.id}>
                                    <button
                                        className="no-advance"
                                        onClick={(e) => { e.stopPropagation(); handleNav(i) }}
                                        style={{
                                            padding: '6px 14px', borderRadius: 8, fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '0.82rem',
                                            cursor: 'pointer', border: active ? '1px solid rgba(0,247,255,0.2)' : '1px solid transparent',
                                            background: active ? 'rgba(0,247,255,0.08)' : 'transparent',
                                            color: active ? 'var(--glow)' : 'var(--text-muted)',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text)' } }}
                                        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-muted)' } }}
                                    >
                                        {s.label}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Right controls: theme toggle + hamburger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                            className="no-advance social-icon"
                            onClick={(e) => { e.stopPropagation(); toggle() }}
                            aria-label="Toggle theme"
                            style={{ width: 36, height: 36, background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer' }}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>

                        {/* Hamburger – mobile only */}
                        <button
                            className="no-advance nav-hamburger"
                            onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v) }}
                            aria-label="Toggle menu"
                            style={{
                                width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--border)',
                                background: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                                display: 'none', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="no-advance"
                        style={{
                            position: 'fixed', top: 60, left: 0, right: 0, zIndex: 49,
                            background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(24px)',
                            borderBottom: '1px solid var(--border)',
                            padding: '12px 16px 20px',
                        }}
                    >
                        {sections.map((s, i) => {
                            const active = i === current
                            return (
                                <button
                                    key={s.id}
                                    className="no-advance"
                                    onClick={(e) => { e.stopPropagation(); handleNav(i) }}
                                    style={{
                                        display: 'block', width: '100%', textAlign: 'left',
                                        padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                                        fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        border: active ? '1px solid rgba(0,247,255,0.2)' : '1px solid transparent',
                                        background: active ? 'rgba(0,247,255,0.08)' : 'transparent',
                                        color: active ? 'var(--glow)' : 'var(--text-muted)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {s.label}
                                </button>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
