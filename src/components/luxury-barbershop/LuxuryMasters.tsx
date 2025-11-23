import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const masters = [
  { name: 'Michael Chen', title: 'Master Barber', exp: '20 Years', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { name: 'James Rodriguez', title: 'Senior Stylist', exp: '15 Years', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { name: 'David Kim', title: 'Barber Artist', exp: '12 Years', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
]

const LuxuryMasters = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="masters" className="py-32 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} 
          className="text-5xl font-bold text-center text-white mb-16 font-serif">
          Our <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Master Barbers</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {masters.map((master, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-xl">
              <img src={master.img} alt={master.name} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-1">{master.name}</h3>
                <p className="text-amber-400">{master.title}</p>
                <p className="text-gray-400 text-sm">{master.exp} Experience</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LuxuryMasters
