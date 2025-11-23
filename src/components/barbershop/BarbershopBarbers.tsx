import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const barbers = [
  {
    id: 1,
    name: 'Minh Tuấn',
    role: 'Master Barber',
    experience: '15 năm',
    specialty: 'Classic & Fade',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Với hơn 15 năm kinh nghiệm, Tuấn là bậc thầy của các kiểu tóc cổ điển và fade hiện đại.',
    social: { instagram: '#', facebook: '#' },
  },
  {
    id: 2,
    name: 'Hoàng Long',
    role: 'Senior Barber',
    experience: '12 năm',
    specialty: 'Modern Style',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Chuyên gia về các kiểu tóc hiện đại và trendy, Long luôn cập nhật xu hướng mới nhất.',
    social: { instagram: '#', facebook: '#' },
  },
  {
    id: 3,
    name: 'Đức Anh',
    role: 'Barber & Stylist',
    experience: '8 năm',
    specialty: 'Coloring & Perm',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    bio: 'Đam mê nhuộm và uốn tóc, Đức Anh mang đến những màu sắc và kiểu dáng độc đáo.',
    social: { instagram: '#', facebook: '#' },
  },
  {
    id: 4,
    name: 'Văn Hải',
    role: 'Barber',
    experience: '6 năm',
    specialty: 'Beard Styling',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Chuyên gia tạo râu và cạo râu truyền thống, Hải mang lại vẻ lịch lãm cho quý ông.',
    social: { instagram: '#', facebook: '#' },
  },
]

interface BarberCardProps {
  barber: typeof barbers[0]
  index: number
  isInView: boolean
}

const BarberCard = ({ barber, index, isInView }: BarberCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setTiltStyle({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltStyle({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: tiltStyle.rotateX,
          rotateY: tiltStyle.rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg overflow-hidden relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={barber.image}
            alt={barber.name}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"
          />
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-3"
          >
            <a
              href={barber.social.instagram}
              className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 hover:bg-amber-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href={barber.social.facebook}
              className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 hover:bg-amber-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-1 font-serif">
            {barber.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-medium">{barber.role}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-sm">{barber.experience}</span>
          </div>
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-xs font-medium mb-3">
            {barber.specialty}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {barber.bio}
          </p>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 border-2 border-amber-500 rounded-lg pointer-events-none"
        />

        {/* 3D Shadow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className="absolute -inset-4 bg-amber-500 rounded-lg -z-10 blur-xl"
        />
      </motion.div>
    </motion.div>
  )
}

const BarbershopBarbers = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="barbers" className="py-20 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #fbbf24 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Đội ngũ của chúng tôi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Gặp Gỡ Các Thợ Cắt Tóc
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Đội ngũ barber chuyên nghiệp, giàu kinh nghiệm và tận tâm với nghề
          </p>
        </motion.div>

        {/* Barbers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {barbers.map((barber, index) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-300 mb-6 text-lg">
            Bạn có thể chỉ định thợ cắt yêu thích khi đặt lịch
          </p>
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-amber-500 text-gray-900 rounded font-bold uppercase text-sm tracking-wide shadow-lg hover:bg-amber-400 transition-all"
          >
            Đặt lịch với thợ yêu thích
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default BarbershopBarbers
