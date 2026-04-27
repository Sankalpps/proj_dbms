import { useState, useEffect } from 'react'

export default function BloodRequests() {
  const [requests, setRequests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    hospital: '',
    bloodType: 'O+',
    units: '',
    urgency: 'normal',
    reason: '',
  })

  useEffect(() => {
    // Mock data
    setRequests([
      {
        id: 1,
        patientName: 'Robert Brown',
        hospital: 'City Hospital',
        bloodType: 'O+',
        units: 3,
        requestDate: '2024-01-15',
        urgency: 'high',
        status: 'completed',
        reason: 'Surgery',
      },
      {
        id: 2,
        patientName: 'Sarah Wilson',
        hospital: 'General Medical Center',
        bloodType: 'A-',
        units: 2,
        requestDate: '2024-01-14',
        urgency: 'normal',
        status: 'pending',
        reason: 'Blood Transfusion',
      },
      {
        id: 3,
        patientName: 'David Lee',
        hospital: 'City Hospital',
        bloodType: 'B+',
        units: 4,
        requestDate: '2024-01-13',
        urgency: 'critical',
        status: 'processing',
        reason: 'Emergency',
      },
    ])
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddRequest = (e) => {
    e.preventDefault()
    const newRequest = {
      id: requests.length + 1,
      ...formData,
      units: parseInt(formData.units),
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    }
    setRequests([...requests, newRequest])
    setFormData({
      patientName: '',
      hospital: '',
      bloodType: 'O+',
      units: '',
      urgency: 'normal',
      reason: '',
    })
    setShowForm(false)
  }

  const handleUpdateStatus = (id, status) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-success">Completed</span>
      case 'pending':
        return <span className="badge badge-warning">Pending</span>
      case 'processing':
        return <span className="badge badge-primary">Processing</span>
      case 'cancelled':
        return <span className="badge badge-danger">Cancelled</span>
      default:
        return <span className="badge badge-primary">{status}</span>
    }
  }

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'critical':
        return <span className="badge badge-danger">Critical</span>
      case 'high':
        return <span className="badge badge-warning">High</span>
      case 'normal':
        return <span className="badge badge-success">Normal</span>
      default:
        return <span className="badge badge-primary">{urgency}</span>
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Blood Requests</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Request'}
        </button>
      </div>

      {/* Request Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Submit New Blood Request</h3>
          <form onSubmit={handleAddRequest}>
            <div className="form-row">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="form-group">
                <label>Units Required</label>
                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Urgency Level</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reason for Request</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Submit Request
            </button>
          </form>
        </div>
      )}

      {/* Requests List */}
      <div className="card">
        <div className="card-header">
          <h2>Blood Requests</h2>
          <span style={{ color: '#666' }}>{requests.length} requests</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Hospital</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.patientName}</td>
                <td>{request.hospital}</td>
                <td>
                  <span className="badge badge-primary">{request.bloodType}</span>
                </td>
                <td>{request.units}</td>
                <td>{getUrgencyBadge(request.urgency)}</td>
                <td>{request.reason}</td>
                <td>{request.requestDate}</td>
                <td>{getStatusBadge(request.status)}</td>
                <td>
                  {request.status === 'pending' && (
                    <button
                      className="btn btn-small btn-success"
                      onClick={() => handleUpdateStatus(request.id, 'processing')}
                    >
                      Process
                    </button>
                  )}
                  {request.status === 'processing' && (
                    <button
                      className="btn btn-small btn-success"
                      onClick={() => handleUpdateStatus(request.id, 'completed')}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
