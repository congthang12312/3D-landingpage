import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Barbershop from './pages/Barbershop'
import TechVN from './pages/TechVN'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Barbershop />} />
        <Route path="/techvn/*" element={<TechVN />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
