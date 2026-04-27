import { useState, useEffect } from 'react'

export default function Reports() {
  const [reportType, setReportType] = useState('donations')
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-15',
  })

  const [reportData, setReportData] = useState({
    totalDonations: 156,
    totalRequests: 42,
    totalUnitsDistributed: 189,
    topBloodType: 'O+',
    topDonors: [
      { name: 'John Doe', donations: 12 },
      { name: 'Mike Johnson', donations: 10 },
      { name: 'Alex Brown', donations: 8 },
    ],
    monthlyStats: [
      { month: 'January', donations: 45, requests: 12 },
      { month: 'December', donations: 38, requests: 10 },
      { month: 'November', donations: 42, requests: 15 },
    ],
  })

  const handleDateChange = (e) => {
    const { name, value } = e.target
    setDateRange({
      ...dateRange,
      [name]: value,
    })
  }

  const handleGenerateReport = () => {
    // Implement report generation logic
    console.log('Generating report for:', reportType, dateRange)
  }

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Reports & Analytics</h2>

      {/* Report Filters */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>Generate Reports</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="donations">Donations Report</option>
              <option value="requests">Blood Requests Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="donors">Donor Report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
            />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <button className="btn btn-primary" onClick={handleGenerateReport}>
              Generate Report
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <div className="value">{reportData.totalDonations}</div>
        </div>
        <div className="stat-card">
          <h3>Total Requests</h3>
          <div className="value">{reportData.totalRequests}</div>
        </div>
        <div className="stat-card">
          <h3>Units Distributed</h3>
          <div className="value">{reportData.totalUnitsDistributed}</div>
        </div>
        <div className="stat-card">
          <h3>Top Blood Type</h3>
          <div className="value">{reportData.topBloodType}</div>
        </div>
      </div>

      {/* Top Donors */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-header">
          <h2>Top Donors</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Total Donations</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.topDonors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.name}</td>
                <td>{donor.donations}</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Statistics */}
      <div className="card">
        <div className="card-header">
          <h2>Monthly Statistics</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Donations</th>
              <th>Requests</th>
              <th>Units Processed</th>
            </tr>
          </thead>
          <tbody>
            {reportData.monthlyStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.month}</td>
                <td>{stat.donations}</td>
                <td>{stat.requests}</td>
                <td>{stat.donations * 2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
