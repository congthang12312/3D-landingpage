import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Phát triển Web',
    description: 'Thiết kế và phát triển website hiện đại, responsive, tối ưu SEO và hiệu suất cao.',
    icon: '🌐',
    features: ['React/Next.js', 'Node.js', 'SEO tối ưu', 'Responsive Design'],
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 2,
    title: 'Ứng dụng Mobile',
    description: 'Xây dựng ứng dụng di động đa nền tảng iOS và Android với trải nghiệm người dùng tuyệt vời.',
    icon: '📱',
    features: ['React Native', 'Flutter', 'iOS/Android', 'Cross-platform'],
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 3,
    title: 'Cloud Solutions',
    description: 'Giải pháp đám mây toàn diện, giúp doanh nghiệp tối ưu chi phí và mở rộng linh hoạt.',
    icon: '☁️',
    features: ['AWS/Azure/GCP', 'DevOps', 'CI/CD', 'Microservices'],
    color: 'from-orange-400 to-amber-400',
  },
  {
    id: 4,
    title: 'AI & Machine Learning',
    description: 'Ứng dụng trí tuệ nhân tạo vào quy trình kinh doanh, tự động hóa và phân tích dữ liệu.',
    icon: '🤖',
    features: ['Computer Vision', 'NLP', 'Data Analytics', 'Automation'],
    color: 'from-green-400 to-emerald-400',
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description: 'Thiết kế giao diện đẹp mắt, trải nghiệm người dùng mượt mà và chuyên nghiệp.',
    icon: '🎨',
    features: ['Figma/Sketch', 'Prototyping', 'User Research', 'Design System'],
    color: 'from-rose-400 to-red-400',
  },
  {
    id: 6,
    title: 'Tư vấn IT',
    description: 'Đội ngũ chuyên gia tư vấn chiến lược công nghệ, chuyển đổi số cho doanh nghiệp.',
    icon: '💼',
    features: ['Digital Strategy', 'Tech Audit', 'Training', 'Support 24/7'],
    color: 'from-indigo-400 to-violet-400',
  },
]

interface ServiceCardProps {
  service: typeof services[0]
  index: number
  isInView: boolean
}

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-2xl p-6 h-full relative overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Icon */}
        <motion.div
          animate={{ y: isHovered ? -5 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl mb-4"
        >
          {service.icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Hover Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          className="absolute bottom-6 right-6"
        >
          <span className="text-primary-500 text-2xl">→</span>
        </motion.div>

        {/* 3D Shadow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          className={`absolute -inset-4 bg-gradient-to-br ${service.color} rounded-3xl -z-10 blur-xl`}
        />
      </motion.div>
    </motion.div>
  )
}

const ServicesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            Dịch vụ của chúng tôi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Giải pháp <span className="gradient-text">toàn diện</span> cho doanh nghiệp
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp đa dạng dịch vụ công nghệ, từ phát triển phần mềm đến tư vấn chuyển đổi số,
            đáp ứng mọi nhu cầu của khách hàng.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
