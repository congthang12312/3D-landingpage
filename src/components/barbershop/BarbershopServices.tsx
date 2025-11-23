import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 1,
    name: 'Classic Haircut',
    price: '150.000đ',
    duration: '45 phút',
    description: 'Cắt tóc cổ điển, tỉa gọn với kỹ thuật truyền thống.',
    features: ['Gội đầu', 'Cắt & tạo kiểu', 'Massage đầu'],
    popular: false,
  },
  {
    id: 2,
    name: 'Premium Haircut',
    price: '250.000đ',
    duration: '60 phút',
    description: 'Trải nghiệm cắt tóc cao cấp với tư vấn phong cách cá nhân.',
    features: ['Gội đầu cao cấp', 'Cắt & tạo kiểu', 'Massage đầu & vai', 'Tạo kiểu sáp'],
    popular: true,
  },
  {
    id: 3,
    name: 'Beard Trim & Shape',
    price: '100.000đ',
    duration: '30 phút',
    description: 'Cạo râu và tạo hình râu chuyên nghiệp.',
    features: ['Tạo hình râu', 'Hot towel', 'Aftershave'],
    popular: false,
  },
  {
    id: 4,
    name: 'Royal Treatment',
    price: '400.000đ',
    duration: '90 phút',
    description: 'Combo đầy đủ dành cho quý ông đẳng cấp.',
    features: ['Premium Haircut', 'Beard Service', 'Face Massage', 'Hair Treatment', 'Uống nước'],
    popular: true,
  },
  {
    id: 5,
    name: 'Hair Coloring',
    price: '300.000đ',
    duration: '90 phút',
    description: 'Nhuộm tóc với sản phẩm chất lượng cao.',
    features: ['Tư vấn màu', 'Nhuộm toàn bộ', 'Gội & sấy'],
    popular: false,
  },
  {
    id: 6,
    name: 'Kids Haircut',
    price: '100.000đ',
    duration: '30 phút',
    description: 'Cắt tóc cho bé yêu với không gian thân thiện.',
    features: ['Cắt tóc trẻ em', 'Gội đầu nhẹ nhàng'],
    popular: false,
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
    >
      {service.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full shadow-lg">
            Phổ biến
          </span>
        </div>
      )}

      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`h-full bg-gray-800/50 backdrop-blur-sm border-2 rounded-lg p-6 transition-all flex flex-col ${
          service.popular
            ? 'border-amber-500 bg-gradient-to-b from-amber-500/5 to-transparent'
            : 'border-gray-700 hover:border-amber-500/50'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6 pb-6 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-2 font-serif min-h-[3.5rem] flex items-center justify-center">
            {service.name}
          </h3>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-amber-400">
              {service.price}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-center mb-6 leading-relaxed min-h-[3rem]">
          {service.description}
        </p>

        {/* Features - flex-1 để chiếm không gian còn lại */}
        <ul className="space-y-3 mb-6 flex-1">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-gray-300">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button - luôn ở cuối */}
        <motion.a
          href="#booking"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`block w-full py-3 rounded font-bold uppercase text-sm tracking-wide text-center transition-all ${
            service.popular
              ? 'bg-amber-500 text-gray-900 hover:bg-amber-400'
              : 'bg-gray-700 text-white hover:bg-amber-500 hover:text-gray-900'
          }`}
        >
          Đặt lịch ngay
        </motion.a>

        {/* Hover shadow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.2 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          className="absolute -inset-2 bg-amber-500 rounded-lg -z-10 blur-xl"
        />
      </motion.div>
    </motion.div>
  )
}

const BarbershopServices = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-amber-500/10 text-9xl">✂️</div>
      <div className="absolute bottom-20 right-10 text-amber-500/10 text-9xl">🪒</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Dịch vụ của chúng tôi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Bảng Giá Dịch Vụ
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Lựa chọn gói dịch vụ phù hợp với phong cách và nhu cầu của bạn
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-lg px-6 py-4">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-300">
              Tất cả dịch vụ đều bao gồm gội đầu và tư vấn phong cách miễn phí
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BarbershopServices
