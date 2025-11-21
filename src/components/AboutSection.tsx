import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Box, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={2}>
        <Box args={[1, 1, 1]} position={[-2, 1, 0]}>
          <MeshDistortMaterial color="#0ea5e9" distort={0.3} speed={2} />
        </Box>
      </Float>
      <Float speed={3} rotationIntensity={1}>
        <Torus args={[0.5, 0.2, 16, 32]} position={[2, -1, 0]}>
          <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={3}>
        <Icosahedron args={[0.7]} position={[0, 0, 1]}>
          <MeshDistortMaterial color="#a5f3fc" distort={0.4} speed={3} />
        </Icosahedron>
      </Float>
    </group>
  )
}

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
    </Canvas>
  )
}

const values = [
  {
    title: 'Sáng tạo',
    description: 'Luôn tìm kiếm những giải pháp mới, đột phá cho mọi thách thức.',
    icon: '💡',
  },
  {
    title: 'Chất lượng',
    description: 'Cam kết mang đến sản phẩm và dịch vụ đạt tiêu chuẩn cao nhất.',
    icon: '⭐',
  },
  {
    title: 'Tận tâm',
    description: 'Đặt lợi ích khách hàng lên hàng đầu trong mọi hoạt động.',
    icon: '🤝',
  },
  {
    title: 'Đổi mới',
    description: 'Không ngừng cập nhật công nghệ để dẫn đầu xu hướng.',
    icon: '🚀',
  },
]

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[400px] lg:h-[500px] order-2 lg:order-1"
          >
            <Scene3D />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
              Về chúng tôi
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Đối tác công nghệ <span className="gradient-text">đáng tin cậy</span> của bạn
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Với hơn 10 năm kinh nghiệm trong ngành công nghệ, TechVN tự hào là đối tác
              chiến lược của hàng trăm doanh nghiệp Việt Nam và quốc tế. Chúng tôi không
              chỉ cung cấp giải pháp, mà còn đồng hành cùng bạn trên hành trình chuyển đổi số.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-4 glass-card rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
