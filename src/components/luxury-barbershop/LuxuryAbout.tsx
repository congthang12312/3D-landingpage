import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'Opened first location' },
  { year: '2012', title: 'Expansion', desc: 'Second location & awards' },
  { year: '2018', title: 'Excellence', desc: 'Best Barbershop Award' },
  { year: '2024', title: 'Legacy', desc: '50,000+ satisfied clients' },
]

const LuxuryAbout = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,0,0,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6 uppercase tracking-widest">
            Our Story
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">
            A Legacy of <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been the premier destination for discerning gentlemen who appreciate 
            the finer things in life. Our master barbers combine traditional techniques with modern precision.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-yellow-600 to-amber-500" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <div className="inline-block bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.desc}</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-gray-950" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LuxuryAbout
