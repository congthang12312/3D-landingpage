import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Trang chủ', href: '#hero' },
  { name: 'Về chúng tôi', href: '#about' },
  { name: 'Dịch vụ', href: '#services' },
  { name: 'Thợ cắt', href: '#barbers' },
  { name: 'Album', href: '#gallery' },
  { name: 'Liên hệ', href: '#contact' },
]

const BarbershopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl">✂️</div>
            <div>
              <div className="text-2xl font-bold text-amber-400 font-serif">
                KINGSMEN
              </div>
              <div className="text-xs text-gray-400 tracking-widest">BARBERSHOP</div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 font-medium transition-colors uppercase text-sm tracking-wide"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              className="px-6 py-2.5 bg-amber-500 text-gray-900 rounded font-bold uppercase text-sm tracking-wide shadow-lg hover:bg-amber-400 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đặt lịch
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-amber-400 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-amber-400 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-amber-400 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-800"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-gray-300 hover:text-amber-400 uppercase text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                className="block mt-2 px-6 py-2.5 bg-amber-500 text-gray-900 rounded font-bold uppercase text-sm text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đặt lịch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default BarbershopNavbar
