import { useLocation } from 'react-router-dom'

export default function Navbar({ onMenuClick }) {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button className="navbar-menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h1>🩸 Blood Bank Management System</h1>
      </div>
      <div style={{ color: 'white', fontSize: '14px' }}>
        Welcome to DBMS Portal
      </div>
    </nav>
  )
}
