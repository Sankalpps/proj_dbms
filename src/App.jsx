import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import DonorManagement from './pages/DonorManagement'
import BloodInventory from './pages/BloodInventory'
import BloodRequests from './pages/BloodRequests'
import Reports from './pages/Reports'
import StaffManagement from './pages/StaffManagement'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Router>
      <div className="app-container">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="main-content">
          <Sidebar isOpen={sidebarOpen} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/donors" element={<DonorManagement />} />
              <Route path="/inventory" element={<BloodInventory />} />
              <Route path="/requests" element={<BloodRequests />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/staff" element={<StaffManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
