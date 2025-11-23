import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Simple 3D Scissors representation using basic shapes
const Scissors3D = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
      groupRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Blade 1 */}
        <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 2, 0.05]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.1, 2, 0.05]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handle 1 */}
        <mesh position={[-0.3, -0.8, 0]}>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Handle 2 */}
        <mesh position={[0.3, -0.8, 0]}>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Center screw */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

// Particles for atmosphere
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 300

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#fbbf24"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fbbf24" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#dc2626" />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} color="#fbbf24" />
      <Suspense fallback={null}>
        <Scissors3D />
        <Particles />
      </Suspense>
    </Canvas>
  )
}

const BarbershopHero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 2px, transparent 2px, transparent 20px)',
        }} />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6"
            >
              <span>⭐</span>
              <span className="uppercase tracking-wide">Hơn 15 năm kinh nghiệm</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-serif"
            >
              KINGSMEN
              <br />
              <span className="text-amber-400">BARBERSHOP</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Nơi phong cách cổ điển gặp gỡ kỹ thuật hiện đại.
              Mang đến cho bạn vẻ ngoài hoàn hảo và trải nghiệm đẳng cấp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#booking"
                className="px-8 py-4 bg-amber-500 text-gray-900 rounded font-bold uppercase text-sm tracking-wide shadow-lg hover:bg-amber-400 transition-all text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Đặt lịch ngay
              </motion.a>
              <motion.a
                href="#services"
                className="px-8 py-4 border-2 border-amber-500 text-amber-400 rounded font-bold uppercase text-sm tracking-wide hover:bg-amber-500/10 transition-all text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem dịch vụ
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700"
            >
              {[
                { value: '15+', label: 'Năm kinh nghiệm' },
                { value: '10K+', label: 'Khách hàng' },
                { value: '4.9', label: 'Đánh giá ⭐' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 font-serif">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Visual Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block h-[600px]"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-3 bg-amber-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default BarbershopHero
