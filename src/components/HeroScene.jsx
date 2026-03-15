import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────
   Magnetic Button — pulls toward cursor on hover
─────────────────────────────────────────────── */
export function MagneticBtn({ children, className = '', style = {}, onClick, href, target, rel }) {
    const ref = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) * 0.35
        const dy = (e.clientY - cy) * 0.35
        el.style.transform = `translate(${dx}px, ${dy}px)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (el) el.style.transform = 'translate(0,0)'
    }, [])

    const sharedProps = {
        ref,
        className,
        style: { transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)', ...style },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    }

    if (href) {
        return <a href={href} target={target} rel={rel} onClick={onClick} {...sharedProps}>{children}</a>
    }
    return <button onClick={onClick} {...sharedProps}>{children}</button>
}

/* ──────────────────────────────────────────────
   Particle Canvas
─────────────────────────────────────────────── */
import { useEffect } from 'react'

function ParticleCanvas() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let W = (canvas.width = window.innerWidth)
        let H = (canvas.height = window.innerHeight)
        const DOTS = Array.from({ length: 60 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
            o: Math.random() * 0.3 + 0.06,
            c: Math.random() > 0.5 ? '124,58,237' : '6,182,212',
        }))
        const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
        window.addEventListener('resize', onResize)
        const draw = () => {
            ctx.clearRect(0, 0, W, H)
            for (const d of DOTS) {
                d.x += d.vx; d.y += d.vy
                if (d.x < 0) d.x = W; if (d.x > W) d.x = 0
                if (d.y < 0) d.y = H; if (d.y > H) d.y = 0
                ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${d.c},${d.o})`; ctx.fill()
            }
            animId = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
    }, [])
    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}

/* ──────────────────────────────────────────────
   Hexagon Avatar (with neon glow ring)
─────────────────────────────────────────────── */
function HexAvatar({ size = 280 }) {
    return (
        <div className="float-y" style={{ position: 'relative', width: size, height: size * 1.1, flexShrink: 0 }}>
            {/* Glow ring behind hex */}
            <div style={{
                position: 'absolute', inset: -20,
                background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                animation: 'glow-pulse 3s ease-in-out infinite',
            }} />
            <div className="hex-border" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.4))' }}>
                <div className="hex-inner" style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/images/profile.jpg"
                        alt="Adarsh L"
                        style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
                        }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.innerHTML = `
                <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.2));">
                  <span style="font-size:4rem;font-weight:800;font-family:Syne,sans-serif;background:linear-gradient(135deg,#a855f7,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AL</span>
                </div>`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

/* ──────────────────────────────────────────────
   Social Links
─────────────────────────────────────────────── */
const SOCIALS = [
    {
        label: 'GitHub', href: 'https://github.com/adarsh-L',
        icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.313 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.5c0-6.63-5.37-12-12-12" /></svg>,
    },
    {
        label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarshloganathan/',
        icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771v20.451C0 23.2.774 24 1.771 24h20.451C23.2 24 24 23.2 24 22.271V1.771C24 .774 23.2 0 22.225 0h.003z" /></svg>,
    },
]

/* ──────────────────────────────────────────────
   Stagger variants
─────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

/* ──────────────────────────────────────────────
   HERO SECTION
─────────────────────────────────────────────── */
export default function HeroScene() {
    const scrollToProjects = () => {
        const el = document.getElementById('projects')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    const scrollToContact = () => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <ParticleCanvas />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 64,
                }}>
                    {/* Left: text */}
                    <div>
                        <motion.p {...fadeUp(0)} className="eyebrow" style={{ marginBottom: 20 }}>
                            {'< Hello World />'}
                        </motion.p>

                        <motion.h1 {...fadeUp(0.1)} style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 1.0,
                            color: 'var(--text)',
                            marginBottom: 16,
                        }}>
                            Adarsh <span className="gradient-text">L</span>
                        </motion.h1>

                        <motion.p {...fadeUp(0.18)} style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                            color: 'var(--text-muted)',
                            marginBottom: 20,
                            letterSpacing: '-0.01em',
                        }}>
                            AI Engineer &amp; Full Stack Developer
                        </motion.p>

                        <motion.p {...fadeUp(0.26)} className="body-text" style={{ maxWidth: 480, marginBottom: 36 }}>
                            Computer Science &amp; Design undergraduate specializing in AI, Machine Learning,
                            and scalable systems. IEEE Published Researcher exploring Quantum ML and Edge AI.
                        </motion.p>

                        {/* Social icons */}
                        <motion.div {...fadeUp(0.32)} style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
                            {SOCIALS.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="social-icon" onClick={e => e.stopPropagation()}>
                                    {s.icon}
                                </a>
                            ))}
                        </motion.div>

                        {/* CTA buttons with magnetic effect */}
                        <motion.div {...fadeUp(0.38)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            <MagneticBtn
                                className="btn btn-primary"
                                onClick={scrollToProjects}
                            >
                                View Projects →
                            </MagneticBtn>

                            <MagneticBtn
                                className="btn btn-ghost"
                                onClick={scrollToContact}
                            >
                                Contact Me
                            </MagneticBtn>
                        </motion.div>
                    </div>

                    {/* Right: Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <HexAvatar size={260} />
                    </motion.div>
                </div>
            </div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
                style={{
                    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    pointerEvents: 'none',
                }}
            >
                <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.5 }}>
                    Scroll to explore
                </p>
                <div style={{
                    width: 1, height: 40,
                    background: 'linear-gradient(to bottom, var(--cyan), transparent)',
                    animation: 'float-y 2s ease-in-out infinite',
                }} />
            </motion.div>

            {/* Responsive */}
            <style>{`
                @media (max-width: 768px) {
                    .hero-responsive { grid-template-columns: 1fr !important; gap: 36px !important; text-align: center; }
                    .hero-avatar-mobile { order: -1; justify-content: center; }
                }
            `}</style>
        </div>
    )
}
