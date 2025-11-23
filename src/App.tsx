import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Barbershop from './pages/Barbershop'
import LuxuryBarbershop from './pages/LuxuryBarbershop'
import ThreeDApp from './pages/ThreeDApp'
import TechVN from './pages/TechVN'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Barbershop />} />
        <Route path="/luxury" element={<LuxuryBarbershop />} />
        <Route path="/3d-shop" element={<ThreeDApp />} />
        <Route path="/techvn/*" element={<TechVN />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
