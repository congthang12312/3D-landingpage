import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const team = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    role: 'CEO & Founder',
    bio: 'Hơn 15 năm kinh nghiệm trong ngành công nghệ, từng làm việc tại Google và Microsoft.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    social: { linkedin: '#', twitter: '#', email: 'an@techvn.com' },
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    role: 'CTO',
    bio: 'Chuyên gia về Cloud và AI với nhiều chứng chỉ AWS, Azure. PhD từ Stanford.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    social: { linkedin: '#', twitter: '#', email: 'binh@techvn.com' },
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    role: 'Lead Developer',
    bio: 'Full-stack developer với 10+ năm kinh nghiệm. Open source contributor.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    social: { linkedin: '#', twitter: '#', email: 'cuong@techvn.com' },
    color: 'from-green-400 to-emerald-400',
  },
  {
    id: 4,
    name: 'Phạm Minh Dương',
    role: 'UI/UX Lead',
    bio: 'Award-winning designer với passion về human-centered design. Ex-Apple.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    social: { linkedin: '#', twitter: '#', email: 'duong@techvn.com' },
    color: 'from-orange-400 to-amber-400',
  },
]

interface TeamCardProps {
  member: typeof team[0]
  index: number
  isInView: boolean
}

const TeamCard = ({ member, index, isInView }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

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
        className="glass-card rounded-2xl p-6 text-center relative overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Avatar */}
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-4 inline-block"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
          />
          <motion.div
            animate={{ scale: isHovered ? 1 : 0 }}
            className={`absolute -inset-2 bg-gradient-to-r ${member.color} rounded-full -z-10 blur-md opacity-60`}
          />
        </motion.div>

        {/* Info */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-primary-500 font-medium text-sm mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="flex justify-center gap-3"
        >
          <a
            href={member.social.linkedin}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={member.social.twitter}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href={`mailto:${member.social.email}`}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>

        {/* 3D Shadow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className={`absolute -inset-4 bg-gradient-to-br ${member.color} rounded-3xl -z-10 blur-xl`}
        />
      </motion.div>
    </motion.div>
  )
}

const TeamSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="py-20 lg:py-32 bg-gradient-to-b from-primary-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            Đội ngũ của chúng tôi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gặp gỡ những <span className="gradient-text">chuyên gia</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đội ngũ TechVN gồm những chuyên gia hàng đầu trong lĩnh vực công nghệ,
            luôn sẵn sàng đồng hành cùng bạn.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
