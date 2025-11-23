import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const story = {
  title: 'Câu chuyện của chúng tôi',
  subtitle: 'Hơn 15 năm kiến tạo phong cách',
  description: [
    'Kingsmen Barbershop được thành lập từ năm 2008 với niềm đam mê mang đến những kiểu tóc đẳng cấp và trải nghiệm cắt tóc chuyên nghiệp cho quý ông.',
    'Chúng tôi kết hợp giữa kỹ thuật cắt tóc truyền thống với xu hướng hiện đại, tạo nên phong cách độc đáo và phù hợp với từng khách hàng.',
    'Với đội ngũ thợ cắt tóc giàu kinh nghiệm và tận tâm, chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho mọi khách hàng.',
  ],
}

const features = [
  {
    icon: '✂️',
    title: 'Thợ chuyên nghiệp',
    description: 'Đội ngũ thợ cắt với hơn 10 năm kinh nghiệm, được đào tạo bài bản.',
  },
  {
    icon: '🏆',
    title: 'Dịch vụ đẳng cấp',
    description: 'Cam kết chất lượng dịch vụ hàng đầu với giá cả hợp lý.',
  },
  {
    icon: '🎨',
    title: 'Phong cách đa dạng',
    description: 'Từ classic đến modern, đáp ứng mọi phong cách bạn mong muốn.',
  },
  {
    icon: '🪒',
    title: 'Dụng cụ cao cấp',
    description: 'Sử dụng tông đơ, kéo và sản phẩm chăm sóc tóc chính hãng.',
  },
]

const BarbershopAbout = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fbbf24 0, #fbbf24 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fbbf24 0, #fbbf24 1px, transparent 1px, transparent 40px)',
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
            {story.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            {story.title}
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {story.description.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-gray-300 leading-relaxed text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-6"
            >
              <div className="flex items-center gap-4 text-amber-400 text-lg font-medium">
                <div className="w-20 h-0.5 bg-amber-400" />
                <span className="font-serif italic">Since 2008</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border-4 border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop"
                alt="Barbershop Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500/10 border-2 border-red-500/30 rounded-lg -z-10" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-amber-500/50 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BarbershopAbout
