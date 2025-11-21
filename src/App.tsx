import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import LoadingSpinner from './components/LoadingSpinner'

const AboutSection = lazy(() => import('./components/AboutSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const PortfolioSection = lazy(() => import('./components/PortfolioSection'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <TeamSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </motion.div>
  )
}

export default App
