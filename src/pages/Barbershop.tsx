import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import BarbershopNavbar from '../components/barbershop/BarbershopNavbar'
import BarbershopHero from '../components/barbershop/BarbershopHero'
import LoadingSpinner from '../components/LoadingSpinner'

const BarbershopAbout = lazy(() => import('../components/barbershop/BarbershopAbout'))
const BarbershopServices = lazy(() => import('../components/barbershop/BarbershopServices'))
const BarbershopBarbers = lazy(() => import('../components/barbershop/BarbershopBarbers'))
const BarbershopGallery = lazy(() => import('../components/barbershop/BarbershopGallery'))
const BarbershopBooking = lazy(() => import('../components/barbershop/BarbershopBooking'))
const BarbershopContact = lazy(() => import('../components/barbershop/BarbershopContact'))
const BarbershopFooter = lazy(() => import('../components/barbershop/BarbershopFooter'))

function Barbershop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900"
    >
      <BarbershopNavbar />
      <main>
        <BarbershopHero />
        <Suspense fallback={<LoadingSpinner />}>
          <BarbershopAbout />
          <BarbershopServices />
          <BarbershopBarbers />
          <BarbershopGallery />
          <BarbershopBooking />
          <BarbershopContact />
          <BarbershopFooter />
        </Suspense>
      </main>
    </motion.div>
  )
}

export default Barbershop
