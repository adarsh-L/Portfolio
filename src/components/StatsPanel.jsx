import { motion } from 'framer-motion'

const GITHUB_USER = 'AdarshL2006'

/* ─── Static stat cards — uses GitHub readme-stats service ─── */
const STATS_CARDS = [
    {
        id: 'stats',
        label: 'GitHub Stats',
        icon: '📊',
        src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00F7FF&icon_color=6366F1&text_color=94A3B8&count_private=true`,
        desc: 'Commits, PRs, Issues',
    },
    {
        id: 'streak',
        label: 'Contribution Streak',
        icon: '🔥',
        src: `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USER}&theme=tokyonight&hide_border=true&background=0d1117&stroke=0d1117&ring=00F7FF&fire=6366F1&currStreakLabel=00F7FF`,
        desc: 'Daily streak',
    },
    {
        id: 'langs',
        label: 'Top Languages',
        icon: '💻',
        src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00F7FF&text_color=94A3B8`,
        desc: 'Most used languages',
    },
]

export default function StatsPanel() {
    return (
        <section className="section-base py-24 bg-gradient-to-b from-[#020617] to-[#0F172A]">
            <div className="max-w-5xl mx-auto px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle text-[#00F7FF]/60 mb-3">System Metrics</p>
                    <h2 className="section-title">
                        GitHub <span className="gradient-text">Dashboard</span>
                    </h2>
                    <p className="text-slate-500 mt-3 text-sm">Live contribution data from GitHub</p>
                </motion.div>

                {/* Stat cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {STATS_CARDS.map((card, i) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="glass glass-hover rounded-2xl p-4 flex flex-col items-center gap-3"
                        >
                            {/* Card label */}
                            <div className="w-full flex items-center gap-2 mb-1">
                                <span className="text-base">{card.icon}</span>
                                <span className="text-xs font-['Space_Grotesk'] font-medium text-slate-300">{card.label}</span>
                                <span className="ml-auto">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F7FF] glow-pulse" />
                                </span>
                            </div>

                            {/* GitHub stats image */}
                            <div className="w-full overflow-hidden rounded-xl bg-[#0d1117]/60">
                                <img
                                    src={card.src}
                                    alt={card.label}
                                    loading="lazy"
                                    className="w-full h-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                {/* Fallback if image fails */}
                                <div
                                    className="hidden items-center justify-center py-10 text-slate-600 text-xs font-['Space_Grotesk']"
                                >
                                    Stats unavailable offline
                                </div>
                            </div>

                            <p className="text-slate-600 text-[0.65rem] font-['Space_Grotesk']">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Profile link */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <a
                        href={`https://github.com/${GITHUB_USER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-['Space_Grotesk'] font-semibold text-[#00F7FF] border border-[#00F7FF]/30 bg-[#00F7FF]/5 hover:bg-[#00F7FF]/10 hover:border-[#00F7FF]/50 hover:shadow-[0_0_20px_rgba(0,247,255,0.2)] transition-all duration-300"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.313 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.5c0-6.63-5.37-12-12-12" />
                        </svg>
                        View GitHub Profile
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
