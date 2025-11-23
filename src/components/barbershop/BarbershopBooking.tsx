import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  'Classic Haircut',
  'Premium Haircut',
  'Beard Trim & Shape',
  'Royal Treatment',
  'Hair Coloring',
  'Kids Haircut',
]

const barbers = ['Minh Tuấn', 'Hoàng Long', 'Đức Anh', 'Văn Hải', 'Bất kỳ thợ nào']

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

const BarbershopBooking = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    barber: '',
    date: '',
    time: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', phone: '', service: '', barber: '', date: '', time: '', notes: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="booking" className="py-20 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 2px, transparent 2px, transparent 20px)',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Đặt lịch hẹn
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Đặt Lịch Ngay
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Chọn dịch vụ, thợ cắt và thời gian phù hợp với bạn
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-amber-400 font-medium mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-amber-400 font-medium mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  placeholder="0901 234 567"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-amber-400 font-medium mb-2">
                  Dịch vụ *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                >
                  <option value="">Chọn dịch vụ</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Barber */}
              <div>
                <label htmlFor="barber" className="block text-amber-400 font-medium mb-2">
                  Thợ cắt
                </label>
                <select
                  id="barber"
                  name="barber"
                  value={formData.barber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                >
                  <option value="">Chọn thợ cắt</option>
                  {barbers.map((barber) => (
                    <option key={barber} value={barber}>
                      {barber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-amber-400 font-medium mb-2">
                  Ngày *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-amber-400 font-medium mb-2">
                  Giờ *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                >
                  <option value="">Chọn giờ</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-amber-400 font-medium mb-2">
                Ghi chú
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                placeholder="Yêu cầu đặc biệt hoặc ghi chú khác..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-amber-500 text-gray-900 rounded font-bold uppercase text-sm tracking-wide shadow-lg hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
                  />
                  Đang xử lý...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Đặt lịch thành công!
                </span>
              ) : (
                'Xác nhận đặt lịch'
              )}
            </motion.button>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-green-400"
              >
                Cảm ơn bạn! Chúng tôi sẽ liên hệ xác nhận lịch hẹn qua số điện thoại đã đăng ký.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: '📞',
              title: 'Hotline',
              content: '0901 234 567',
            },
            {
              icon: '⏰',
              title: 'Giờ làm việc',
              content: '9:00 - 19:00 (Hằng ngày)',
            },
            {
              icon: '📍',
              title: 'Địa chỉ',
              content: '123 Nguyễn Huệ, Q.1, TP.HCM',
            },
          ].map((info) => (
            <div
              key={info.title}
              className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center"
            >
              <div className="text-3xl mb-2">{info.icon}</div>
              <div className="text-amber-400 text-sm font-medium mb-1 uppercase tracking-wide">
                {info.title}
              </div>
              <div className="text-white font-medium">{info.content}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BarbershopBooking
