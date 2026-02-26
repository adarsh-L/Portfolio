import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Canvas particle system ─── */
function ParticleCanvas() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let W = (canvas.width = window.innerWidth)
        let H = (canvas.height = window.innerHeight)
        const DOTS = Array.from({ length: 55 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.1 + 0.3,
            vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
            o: Math.random() * 0.35 + 0.08,
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
                ctx.fillStyle = `rgba(0,247,255,${d.o})`; ctx.fill()
            }
            animId = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
    }, [])
    return <canvas ref={canvasRef} className="particles-canvas" />
}

/* ─── Hexagon avatar ─── */
function HexAvatar({ size = 300 }) {
    return (
        <div className="float-y" style={{ width: size, height: size * 1.1 }}>
            <div className="hex-border" style={{ width: '100%', height: '100%' }}>
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
                <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);background:#111827;">
                  <span style="font-size:4rem;font-weight:700;font-family:Space Grotesk,sans-serif;background:linear-gradient(135deg,#00f7ff,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AL</span>
                </div>`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/adarsh-L', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.313 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.5c0-6.63-5.37-12-12-12" /></svg> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarshloganathan/', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
]

const stagger = (i) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.14 + 0.2, duration: 0.6, ease: 'easeOut' } })

export default function HeroScene({ onNavigate }) {
    return (
        <div className="section-wrap relative">
            <ParticleCanvas />
            <div className="container relative z-10">
                {/* Responsive hero layout */}
                <div className="hero-grid">

                    {/* Left: text content */}
                    <div>
                        <motion.p {...stagger(0)} className="section-eyebrow" style={{ marginBottom: 14 }}>Hello, It's Me</motion.p>

                        <motion.h1 {...stagger(1)} style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 12 }}>
                            Adarsh <span className="gradient-text">L</span>
                        </motion.h1>

                        <motion.p {...stagger(2)} style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                            AI Engineer &amp; Full Stack Developer
                        </motion.p>

                        <motion.p {...stagger(3)} className="body-text" style={{ maxWidth: 460, marginBottom: 22 }}>
                            Computer Science and Design undergraduate specializing in AI, Machine Learning and scalable systems. IEEE Published Researcher.
                        </motion.p>

                        {/* Social icons */}
                        <motion.div {...stagger(4)} className="no-advance" style={{ display: 'flex', gap: 10, marginBottom: 26 }}>
                            {SOCIALS.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="social-icon no-advance" onClick={e => e.stopPropagation()}>
                                    {s.icon}
                                </a>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div {...stagger(5)} className="no-advance">
                            <button className="btn btn-primary no-advance"
                                onClick={(e) => { e.stopPropagation(); onNavigate(1) }}>
                                Let's Start &nbsp;→
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Hexagon avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="hero-avatar"
                    >
                        <HexAvatar size={260} />
                    </motion.div>
                </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 pointer-events-none">
                <p style={{ fontSize: '0.68rem', fontFamily: 'Space Grotesk', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.55 }}>
                    Click anywhere to continue
                </p>
            </motion.div>
        </div>
    )
}
