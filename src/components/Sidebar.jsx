import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link
            to="/"
            className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">📊</span>
            Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/donors"
            className={`sidebar-link ${isActive('/donors') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">👥</span>
            Donors
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/inventory"
            className={`sidebar-link ${isActive('/inventory') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">🩸</span>
            Blood Inventory
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/requests"
            className={`sidebar-link ${isActive('/requests') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">📋</span>
            Blood Requests
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/reports"
            className={`sidebar-link ${isActive('/reports') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">📈</span>
            Reports
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/staff"
            className={`sidebar-link ${isActive('/staff') ? 'active' : ''}`}
          >
            <span className="sidebar-icon">👔</span>
            Staff Management
          </Link>
        </li>
      </ul>
    </aside>
  )
}
