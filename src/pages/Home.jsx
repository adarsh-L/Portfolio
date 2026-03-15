import HeroScene from '../components/HeroScene.jsx'
import AboutSection from '../components/AboutSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import Projects3D from '../components/Projects3D.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import CertificationsSection from '../components/CertificationsSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
]

export default function Home() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Animated background blobs (fixed, behind everything) */}
            <AnimatedBackground />

            {/* Sticky navigation */}
            <Navbar sections={SECTIONS} />

            {/* Vertical scrolling sections */}
            <main>
                <section id="home">
                    <HeroScene />
                </section>

                <section id="about">
                    <AboutSection />
                </section>

                <section id="skills">
                    <SkillsSection />
                </section>

                <section id="projects">
                    <Projects3D />
                </section>

                <section id="experience">
                    <ExperienceSection />
                </section>

                <section id="certifications">
                    <CertificationsSection />
                </section>

                <section id="contact">
                    <ContactSection />
                </section>
            </main>

            <Footer />
        </div>
    )
}
