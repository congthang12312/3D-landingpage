import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Cylinder, Torus, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D Barber Pole - iconic symbol
const BarberPole = () => {
  const poleRef = useRef<THREE.Group>(null)
  const spiralRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (poleRef.current) {
      poleRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
    if (spiralRef.current) {
      spiralRef.current.rotation.y = clock.getElapsedTime() * 1.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={poleRef}>
        {/* Main pole */}
        <Cylinder args={[0.3, 0.3, 4, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8B0000" metalness={0.9} roughness={0.1} />
        </Cylinder>

        {/* Gold caps */}
        <Cylinder args={[0.35, 0.35, 0.2, 32]} position={[0, 2.1, 0]}>
          <meshStandardMaterial color="#DAA520" metalness={1} roughness={0.1} />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.2, 32]} position={[0, -2.1, 0]}>
          <meshStandardMaterial color="#DAA520" metalness={1} roughness={0.1} />
        </Cylinder>

        {/* Rotating spiral effect */}
        <mesh ref={spiralRef}>
          <Torus args={[0.31, 0.05, 16, 100]} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.31, 0.05, 16, 100]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.31, 0.05, 16, 100]} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.31, 0.05, 16, 100]} position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </Torus>
        </mesh>
      </group>
    </Float>
  )
}

// Floating luxury particles
const LuxuryParticles = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 400

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    // Gold and white particles
    const isGold = Math.random() > 0.7
    colors[i * 3] = isGold ? 0.85 : 1
    colors[i * 3 + 1] = isGold ? 0.65 : 1
    colors[i * 3 + 2] = isGold ? 0.13 : 1
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Ambient spheres for depth
const AmbientSpheres = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-4, 2, -3]}>
          <MeshDistortMaterial
            color="#8B0000"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.7, 32, 32]} position={[4, -2, -2]}>
          <MeshDistortMaterial
            color="#DAA520"
            distort={0.3}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.2}
          />
        </Sphere>
      </Float>
    </>
  )
}

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={['transparent']} />

      {/* Lighting setup for luxury feel */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B0000" />
      <pointLight position={[10, 5, 5]} intensity={0.8} color="#DAA520" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      <Suspense fallback={null}>
        <BarberPole />
        <LuxuryParticles />
        <AmbientSpheres />
      </Suspense>
    </Canvas>
  )
}

const LuxuryHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-red-950">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.1),transparent_50%)]" />

      {/* Marble texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-red-900/10 border border-amber-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="text-2xl">👑</span>
              <span className="text-amber-400 font-medium uppercase tracking-widest text-sm">
                Luxury Experience Since 2008
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            >
              <span className="block text-white font-serif">THE</span>
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-serif">
                GENTLEMEN'S
              </span>
              <span className="block text-white font-serif">PARLOUR</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Where <span className="text-amber-400 italic">timeless elegance</span> meets
              <span className="text-amber-400 italic"> modern grooming</span> excellence
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(218, 165, 32, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-gray-900 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                  <span>Book Appointment</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-amber-500 rounded-full text-amber-400 font-bold uppercase tracking-wider text-sm hover:bg-amber-500/10 transition-all backdrop-blur-sm"
              >
                Explore Services
              </motion.a>
            </motion.div>

            {/* Awards & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-gray-800"
            >
              {[
                { value: '15+', label: 'Years Excellence', icon: '🏆' },
                { value: '50K+', label: 'Satisfied Clients', icon: '⭐' },
                { value: '5.0', label: 'Rating', icon: '💎' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent font-serif mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block h-[700px]"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-amber-400 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-amber-500/20" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-amber-500/20" />
    </section>
  )
}

export default LuxuryHero
