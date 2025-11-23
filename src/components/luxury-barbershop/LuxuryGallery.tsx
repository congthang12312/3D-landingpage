import { motion } from 'framer-motion'

const LuxuryGallery = () => {
  return (
    <section className="py-32 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-5xl font-bold text-white font-serif">
          Gallery
        </motion.h2>
        <p className="text-gray-300 mt-6 text-xl">Coming soon with amazing 3D effects...</p>
      </div>
    </section>
  )
}

export default LuxuryGallery
