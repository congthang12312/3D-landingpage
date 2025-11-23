import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import LuxuryNavbar from '../components/luxury-barbershop/LuxuryNavbar'
import LuxuryHero from '../components/luxury-barbershop/LuxuryHero'
import LoadingSpinner from '../components/LoadingSpinner'

// Lazy load các components khác để tối ưu performance
const LuxuryAbout = lazy(() => import('../components/luxury-barbershop/LuxuryAbout'))
const LuxuryServices = lazy(() => import('../components/luxury-barbershop/LuxuryServices'))
const LuxuryMasters = lazy(() => import('../components/luxury-barbershop/LuxuryMasters'))
const LuxuryGallery = lazy(() => import('../components/luxury-barbershop/LuxuryGallery'))
const LuxuryTestimonials = lazy(() => import('../components/luxury-barbershop/LuxuryTestimonials'))
const LuxuryBooking = lazy(() => import('../components/luxury-barbershop/LuxuryBooking'))
const LuxuryContact = lazy(() => import('../components/luxury-barbershop/LuxuryContact'))
const LuxuryFooter = lazy(() => import('../components/luxury-barbershop/LuxuryFooter'))

function LuxuryBarbershop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-950"
    >
      <LuxuryNavbar />
      <main>
        <LuxuryHero />
        <Suspense fallback={<LoadingSpinner />}>
          <LuxuryAbout />
          <LuxuryServices />
          <LuxuryMasters />
          <LuxuryGallery />
          <LuxuryTestimonials />
          <LuxuryBooking />
          <LuxuryContact />
          <LuxuryFooter />
        </Suspense>
      </main>
    </motion.div>
  )
}

export default LuxuryBarbershop
