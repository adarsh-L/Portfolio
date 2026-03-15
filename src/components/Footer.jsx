import { motion } from 'framer-motion'

const SOCIAL_LINKS = [
    {
        label: 'GitHub', href: 'https://github.com/adarsh-L',
        icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.313 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.5c0-6.63-5.37-12-12-12" /></svg>,
    },
    {
        label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarshloganathan/',
        icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    },
]

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer style={{
            padddingTop: 0,
            paddingBottom: 0,
            borderTop: '1px solid var(--border)',
            background: 'rgba(11,11,15,0.6)',
            backdropFilter: 'blur(16px)',
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>

                {/* Left: logo + copyright */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 7,
                        background: 'linear-gradient(135deg, var(--purple), var(--cyan))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ color: '#fff', fontSize: '0.6rem', fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>AL</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        © 2025 <span style={{ color: 'var(--cyan)' }}>Adarsh L</span> — AI Engineer &amp; Full Stack Developer
                    </p>
                </div>

                {/* Center: social icons */}
                <div style={{ display: 'flex', gap: 10 }}>
                    {SOCIAL_LINKS.map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="social-icon" style={{ width: 34, height: 34 }}>
                            {s.icon}
                        </a>
                    ))}
                </div>

                {/* Right: back to top */}
                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '7px 16px', borderRadius: 8,
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        cursor: 'pointer', color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                        transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-glow)'; e.currentTarget.style.color = 'var(--cyan)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                    ↑ Back to top
                </motion.button>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    footer > div { flex-direction: column; align-items: center; text-align: center; padding: 24px 20px; }
                }
            `}</style>
        </footer>
    )
}
