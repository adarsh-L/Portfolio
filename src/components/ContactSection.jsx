import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

const SOCIAL_LINKS = [
    {
        label: 'GitHub', href: 'https://github.com/adarsh-L',
        icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.313 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.5c0-6.63-5.37-12-12-12" /></svg>,
    },
    {
        label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarshloganathan/',
        icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    },
]

const CONTACT_ITEMS = [
    { label: 'Email', value: 'adarshloganathan16@gmail.com', href: 'mailto:adarshloganathan16@gmail.com', icon: '✉', color: '#06b6d4' },
    { label: 'Phone', value: '+91 98800 09747', href: 'tel:+919880009747', icon: '📞', color: '#7c3aed' },
]

export default function ContactSection() {
    return (
        <div className="section">
            <div className="container section-inner">

                {/* Header */}
                <motion.div {...fadeUp(0)} style={{ marginBottom: 56, textAlign: 'center' }}>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>Get In Touch</p>
                    <h2 className="section-title">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="body-text" style={{ marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
                        Open to AI/ML, full-stack, and research collaboration opportunities.
                        Currently seeking internship and full-time roles.
                    </p>
                </motion.div>

                {/* Contact cards */}
                <motion.div {...fadeUp(0.1)} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    maxWidth: 520,
                    margin: '0 auto 40px',
                }}>
                    {CONTACT_ITEMS.map(item => (
                        <a key={item.label} href={item.href}
                            className="glass"
                            style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', transition: 'all 0.25s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}40`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${item.color}14` }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                                background: `${item.color}12`, border: `1.5px solid ${item.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <p style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 4 }}>
                                    {item.label}
                                </p>
                                <p style={{ fontSize: '0.92rem', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                                    {item.value}
                                </p>
                            </div>
                            <div style={{ marginLeft: 'auto', color: item.color, fontSize: '1rem', opacity: 0.7 }}>→</div>
                        </a>
                    ))}
                </motion.div>

                {/* Social icons */}
                <motion.div {...fadeUp(0.2)} style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
                    {SOCIAL_LINKS.map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="social-icon" style={{ width: 52, height: 52 }}>
                            {s.icon}
                        </a>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}
