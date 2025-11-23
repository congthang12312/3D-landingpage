import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { name: 'Signature Cut', price: '$80', time: '60 min', desc: 'Premium haircut with consultation', icon: '✂️' },
  { name: 'Royal Shave', price: '$60', time: '45 min', desc: 'Hot towel shave experience', icon: '🪒' },
  { name: 'Beard Sculpting', price: '$50', time: '30 min', desc: 'Expert beard grooming', icon: '💈' },
  { name: 'Complete Grooming', price: '$150', time: '90 min', desc: 'Full luxury experience', icon: '👑' },
]

const LuxuryServices = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="services" className="py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">
            Premium <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Services</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500 transition-all">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <div className="text-3xl font-bold text-amber-400 mb-2">{service.price}</div>
              <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
              <div className="text-xs text-gray-500">{service.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LuxuryServices
