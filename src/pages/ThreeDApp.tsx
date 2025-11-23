import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Box,
  Sphere,
  Cylinder,
  Text,
  Html,
  useGLTF
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// Interactive Barber Chair
const BarberChair = ({ position, onClick, isSelected }: any) => {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Chair Base */}
      <Cylinder args={[0.4, 0.5, 0.2, 32]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={isSelected ? "#DAA520" : "#2c2c2c"} metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Chair Pole */}
      <Cylinder args={[0.1, 0.1, 1, 16]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Seat */}
      <Box args={[1, 0.2, 1]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color={isSelected ? "#8B0000" : "#1a0000"} />
      </Box>

      {/* Backrest */}
      <Box args={[1, 1.2, 0.2]} position={[0, 1.9, -0.4]}>
        <meshStandardMaterial color={isSelected ? "#8B0000" : "#1a0000"} />
      </Box>

      {/* Armrests */}
      <Box args={[0.1, 0.6, 0.8]} position={[-0.55, 1.5, 0]}>
        <meshStandardMaterial color={isSelected ? "#8B0000" : "#1a0000"} />
      </Box>
      <Box args={[0.1, 0.6, 0.8]} position={[0.55, 1.5, 0]}>
        <meshStandardMaterial color={isSelected ? "#8B0000" : "#1a0000"} />
      </Box>

      {/* Hover indicator */}
      {hovered && (
        <Html position={[0, 2.8, 0]} center>
          <div className="bg-gray-900 text-amber-400 px-4 py-2 rounded-full text-sm font-bold border border-amber-500 whitespace-nowrap">
            Click to Select
          </div>
        </Html>
      )}
    </group>
  )
}

// Interactive Mirror
const Mirror = ({ position, chairNumber }: any) => {
  return (
    <group position={position}>
      {/* Mirror Frame */}
      <Box args={[2, 2.5, 0.1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Mirror Surface */}
      <Box args={[1.8, 2.3, 0.05]} position={[0, 1.5, 0.06]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>

      {/* Light Bulbs */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <Sphere key={i} args={[0.08, 16, 16]} position={[x, 2.8, 0.15]}>
          <meshStandardMaterial
            color="#fff5e6"
            emissive="#ffcc66"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}

      {/* Chair Number */}
      <Text
        position={[0, 0.3, 0.2]}
        fontSize={0.3}
        color="#DAA520"
        anchorX="center"
        anchorY="middle"
      >
        {`Chair ${chairNumber}`}
      </Text>
    </group>
  )
}

// Waiting Area Sofa
const WaitingSofa = ({ position }: any) => {
  return (
    <group position={position}>
      {/* Seat */}
      <Box args={[3, 0.4, 1]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#2d2d2d" />
      </Box>

      {/* Backrest */}
      <Box args={[3, 0.8, 0.3]} position={[0, 0.8, -0.35]}>
        <meshStandardMaterial color="#2d2d2d" />
      </Box>

      {/* Armrests */}
      <Box args={[0.3, 0.6, 1]} position={[-1.5, 0.5, 0]}>
        <meshStandardMaterial color="#2d2d2d" />
      </Box>
      <Box args={[0.3, 0.6, 1]} position={[1.5, 0.5, 0]}>
        <meshStandardMaterial color="#2d2d2d" />
      </Box>
    </group>
  )
}

// Product Shelf
const ProductShelf = ({ position }: any) => {
  return (
    <group position={position}>
      {/* Shelf structure */}
      {[0, 0.8, 1.6].map((y, i) => (
        <Box key={i} args={[2, 0.05, 0.4]} position={[0, y, 0]}>
          <meshStandardMaterial color="#3d2817" />
        </Box>
      ))}

      {/* Products (bottles) */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <group key={i}>
          <Cylinder args={[0.08, 0.08, 0.4, 16]} position={[x, 0.2, 0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#1a1a1a" : "#4a4a4a"}
              metalness={0.3}
              roughness={0.5}
            />
          </Cylinder>
        </group>
      ))}
    </group>
  )
}

// Reception Desk
const ReceptionDesk = ({ position }: any) => {
  return (
    <group position={position}>
      {/* Desk top */}
      <Box args={[3, 0.1, 1.5]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#3d2817" />
      </Box>

      {/* Desk base */}
      <Box args={[2.8, 0.9, 1.3]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#2d1f10" />
      </Box>

      {/* Computer */}
      <Box args={[0.4, 0.3, 0.03]} position={[0, 1.25, 0.3]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
    </group>
  )
}

// Floor
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  )
}

// Walls
const Walls = () => {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

// Main 3D Scene
const BarbershopScene = ({ selectedChair, onChairSelect }: any) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={60} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffcc66" />
      <spotLight
        position={[-3, 4, 2]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[3, 4, 2]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* Environment */}
      <Environment preset="city" />

      {/* Scene Objects */}
      <Floor />
      <Walls />

      {/* Barber Chairs with Mirrors */}
      <BarberChair
        position={[-3, 0, 2]}
        onClick={() => onChairSelect(1)}
        isSelected={selectedChair === 1}
      />
      <Mirror position={[-3, 0, 0.5]} chairNumber={1} />

      <BarberChair
        position={[0, 0, 2]}
        onClick={() => onChairSelect(2)}
        isSelected={selectedChair === 2}
      />
      <Mirror position={[0, 0, 0.5]} chairNumber={2} />

      <BarberChair
        position={[3, 0, 2]}
        onClick={() => onChairSelect(3)}
        isSelected={selectedChair === 3}
      />
      <Mirror position={[3, 0, 0.5]} chairNumber={3} />

      {/* Waiting Area */}
      <WaitingSofa position={[-5, 0, -2]} />

      {/* Product Shelves */}
      <ProductShelf position={[7, 1, 0]} />
      <ProductShelf position={[7, 1, -3]} />

      {/* Reception Desk */}
      <ReceptionDesk position={[0, 0, -3.5]} />

      {/* Contact Shadows for realism */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={20}
        blur={2}
        far={10}
      />
    </>
  )
}

// Loading Component
const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <div className="text-white text-lg">Loading 3D Barbershop...</div>
    </div>
  </Html>
)

// Main Component
const ThreeDApp = () => {
  const [selectedChair, setSelectedChair] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(true)

  return (
    <div className="relative w-full h-screen bg-gray-950">
      {/* 3D Canvas */}
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          <BarbershopScene
            selectedChair={selectedChair}
            onChairSelect={setSelectedChair}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/80 backdrop-blur-lg border border-amber-500/30 rounded-2xl px-6 py-4 pointer-events-auto"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              3D Virtual Barbershop
            </h1>
            <p className="text-gray-400 text-sm">Interactive Experience</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowInfo(!showInfo)}
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 rounded-full font-bold pointer-events-auto transition-all"
          >
            {showInfo ? 'Hide' : 'Show'} Controls
          </motion.button>
        </div>
      </div>

      {/* Instructions */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute left-6 top-32 bg-gray-900/90 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-6 max-w-sm pointer-events-auto"
          >
            <h3 className="text-xl font-bold text-amber-400 mb-4">Controls</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">🖱️</span>
                <span><strong>Left Click + Drag:</strong> Rotate camera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">🖱️</span>
                <span><strong>Right Click + Drag:</strong> Pan camera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">🔍</span>
                <span><strong>Scroll:</strong> Zoom in/out</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">👆</span>
                <span><strong>Click Chair:</strong> Select station</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Chair Info */}
      <AnimatePresence>
        {selectedChair && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-6 max-w-md pointer-events-auto"
          >
            <h3 className="text-2xl font-bold text-amber-400 mb-2">
              Station {selectedChair}
            </h3>
            <p className="text-gray-300 mb-4">
              Premium barbershop chair with professional setup
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-xs text-gray-400">Status</div>
                <div className="text-green-400 font-bold">Available</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-xs text-gray-400">Next Available</div>
                <div className="text-white font-bold">Now</div>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              Book This Station
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-lg border border-amber-500/30 rounded-full px-6 py-3 flex items-center gap-6 text-sm pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-300">3 Stations Available</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div className="text-gray-400">Move around to explore</div>
      </div>
    </div>
  )
}

export default ThreeDApp
