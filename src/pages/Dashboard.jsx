import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    bloodInventory: {
      'O+': 0,
      'O-': 0,
      'A+': 0,
      'A-': 0,
      'B+': 0,
      'B-': 0,
      'AB+': 0,
      'AB-': 0,
    },
    staff: 0,
  })

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalDonors: 245,
      totalRequests: 32,
      bloodInventory: {
        'O+': 45,
        'O-': 15,
        'A+': 28,
        'A-': 12,
        'B+': 35,
        'B-': 8,
        'AB+': 10,
        'AB-': 5,
      },
      staff: 18,
    })
  }, [])

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Dashboard</h2>

      {/* Quick Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Donors</h3>
          <div className="value">{stats.totalDonors}</div>
        </div>
        <div className="stat-card">
          <h3>Active Requests</h3>
          <div className="value">{stats.totalRequests}</div>
        </div>
        <div className="stat-card">
          <h3>Staff Members</h3>
          <div className="value">{stats.staff}</div>
        </div>
        <div className="stat-card">
          <h3>Total Units</h3>
          <div className="value">
            {Object.values(stats.bloodInventory).reduce((a, b) => a + b, 0)}
          </div>
        </div>
      </div>

      {/* Blood Inventory */}
      <div className="card">
        <div className="card-header">
          <h2>Blood Inventory by Type</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {bloodTypes.map((type) => (
            <div
              key={type}
              style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #ddd',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                {type}
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#c41e3a',
                }}
              >
                {stats.bloodInventory[type]}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Units available
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-header">
          <h2>Recent Activity</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Blood Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-15</td>
              <td>Blood Donation</td>
              <td>O+</td>
              <td><span className="badge badge-success">Completed</span></td>
            </tr>
            <tr>
              <td>2024-01-14</td>
              <td>Blood Request</td>
              <td>A-</td>
              <td><span className="badge badge-warning">Pending</span></td>
            </tr>
            <tr>
              <td>2024-01-13</td>
              <td>Stock Update</td>
              <td>B+</td>
              <td><span className="badge badge-primary">Updated</span></td>
            </tr>
            <tr>
              <td>2024-01-12</td>
              <td>Donor Registration</td>
              <td>AB+</td>
              <td><span className="badge badge-success">Registered</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
