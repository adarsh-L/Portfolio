import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.jsx'

function SunIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none" /></svg> }
function MoonIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> }

export default function Navbar({ sections, current, onNavigate }) {
    const { theme, toggle } = useTheme()

    return (
        <motion.nav
            initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
        >
            <div style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: 60, paddingRight: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <button className="no-advance" onClick={(e) => { e.stopPropagation(); onNavigate(0) }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, var(--glow), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>AL</span>
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', letterSpacing: '0.02em' }}>Adarsh L</span>
                </button>

                {/* Nav items — all 6 on desktop */}
                <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
                    {sections.map((s, i) => {
                        const active = i === current
                        return (
                            <li key={s.id}>
                                <button
                                    className="no-advance"
                                    onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
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

                {/* Theme toggle */}
                <button
                    className="no-advance social-icon"
                    onClick={(e) => { e.stopPropagation(); toggle() }}
                    aria-label="Toggle theme"
                    style={{ width: 36, height: 36, background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer' }}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </motion.nav>
    )
}
