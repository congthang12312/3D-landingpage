import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Nền tảng thương mại điện tử với hơn 1 triệu sản phẩm và 500K người dùng hoạt động.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'FinTech Mobile App',
    category: 'Mobile Development',
    description: 'Ứng dụng ngân hàng số với tính năng chuyển tiền, thanh toán và quản lý tài chính cá nhân.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    tags: ['React Native', 'TypeScript', 'AWS'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Healthcare Dashboard',
    category: 'UI/UX Design',
    description: 'Hệ thống quản lý bệnh viện thông minh với AI hỗ trợ chẩn đoán.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
    tags: ['Figma', 'React', 'Python'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Logistics Platform',
    category: 'Cloud Solutions',
    description: 'Hệ thống quản lý vận chuyển và logistics cho chuỗi cung ứng toàn cầu.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    tags: ['AWS', 'Microservices', 'IoT'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 5,
    title: 'AI Chatbot',
    category: 'AI & ML',
    description: 'Chatbot AI hỗ trợ khách hàng 24/7 với khả năng xử lý ngôn ngữ tự nhiên.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
    tags: ['Python', 'TensorFlow', 'NLP'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 6,
    title: 'Smart Factory',
    category: 'IoT Solutions',
    description: 'Hệ thống nhà máy thông minh với giám sát real-time và tự động hóa quy trình.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop',
    tags: ['IoT', 'Edge Computing', 'Analytics'],
    color: 'from-rose-500 to-red-500',
  },
]

const categories = ['Tất cả', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Cloud Solutions', 'AI & ML', 'IoT Solutions']

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  onClick: () => void
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? -5 : 0,
          rotateY: isHovered ? 5 : 0,
          z: isHovered ? 30 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-80`}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute inset-0 p-6 flex flex-col justify-end text-white"
        >
          <span className="text-sm font-medium opacity-90 mb-1">{project.category}</span>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
          <div className="flex gap-2 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white/20 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3D Shadow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          className={`absolute -inset-4 bg-gradient-to-br ${project.color} rounded-3xl -z-10 blur-2xl`}
        />
      </motion.div>
    </motion.div>
  )
}

const PortfolioSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === 'Tất cả'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            Dự án tiêu biểu
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Những <span className="gradient-text">thành công</span> của chúng tôi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các dự án đã được TechVN thực hiện thành công cho khách hàng trong và ngoài nước.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="text-primary-500 text-sm font-medium">{selectedProject.category}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{selectedProject.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-primary"
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PortfolioSection
