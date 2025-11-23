import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
    category: 'Classic',
    title: 'Classic Gentleman',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop',
    category: 'Modern',
    title: 'Modern Fade',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop',
    category: 'Beard',
    title: 'Beard Styling',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
    category: 'Interior',
    title: 'Shop Interior',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=600&fit=crop',
    category: 'Classic',
    title: 'Vintage Style',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&h=600&fit=crop',
    category: 'Modern',
    title: 'Textured Cut',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
    category: 'Beard',
    title: 'Full Beard Trim',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1521490878590-e0a4e69b0a3c?w=600&h=600&fit=crop',
    category: 'Interior',
    title: 'Barbershop Vibes',
  },
]

const categories = ['Tất cả', 'Classic', 'Modern', 'Beard', 'Interior']

interface GalleryItemProps {
  image: typeof galleryImages[0]
  index: number
  onClick: () => void
}

const GalleryItem = ({ image, index, onClick }: GalleryItemProps) => {
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
      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
    >
      <motion.img
        src={image.url}
        alt={image.title}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex items-end p-4"
      >
        <div>
          <span className="inline-block px-2 py-1 bg-amber-500 text-gray-900 text-xs font-bold uppercase rounded mb-2">
            {image.category}
          </span>
          <h3 className="text-white font-bold text-lg">{image.title}</h3>
        </div>
      </motion.div>

      {/* Border effect */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 border-2 border-amber-500 rounded-lg pointer-events-none"
      />
    </motion.div>
  )
}

const BarbershopGallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages =
    activeCategory === 'Tất cả'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Album của chúng tôi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Những Tác Phẩm
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Chiêm ngưỡng các kiểu tóc đã thực hiện tại Kingsmen Barbershop
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
              className={`px-5 py-2.5 rounded font-medium text-sm uppercase tracking-wide transition-all ${
                activeCategory === category
                  ? 'bg-amber-500 text-gray-900 shadow-lg'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-amber-500/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 rounded-b-lg">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-gray-900 text-sm font-bold uppercase rounded mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl">{selectedImage.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 hover:bg-gray-900 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-4 text-lg">
            Theo dõi chúng tôi để xem thêm nhiều tác phẩm
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BarbershopGallery
