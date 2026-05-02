import { useState, useEffect } from 'react'

export default function DonorManagement() {
  const [donors, setDonors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: 'O+',
    dob: '',
    address: '',
  })

  useEffect(() => {
    // Mock data
    const generateReport = (bloodType) => {
      const hemoglobin = (Math.random() * 2 + 12).toFixed(1)
      const whiteBloodCells = (Math.random() * 5 + 4.5).toFixed(1)
      const platelets = (Math.random() * 100 + 150).toFixed(0)
      const status = parseInt(hemoglobin) >= 12.5 ? 'Healthy' : 'Low'
      
      return {
        hemoglobin: `${hemoglobin} g/dL`,
        whiteBloodCells: `${whiteBloodCells} K/µL`,
        platelets: `${platelets} K/µL`,
        status: status,
        testDate: '2024-01-08',
      }
    }

    setDonors([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0101',
        bloodType: 'O+',
        dob: '1990-05-15',
        address: '123 Main Street, Springfield, IL 62701',
        lastDonation: '2024-01-10',
        donations: 5,
        bloodReport: generateReport('O+'),
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0102',
        bloodType: 'A-',
        dob: '1992-08-22',
        address: '456 Oak Avenue, Portland, OR 97201',
        lastDonation: '2024-01-05',
        donations: 3,
        bloodReport: generateReport('A-'),
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '555-0103',
        bloodType: 'B+',
        dob: '1988-03-10',
        address: '789 Elm Boulevard, Austin, TX 78701',
        lastDonation: '2024-01-12',
        donations: 8,
        bloodReport: generateReport('B+'),
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

  const handleAddDonor = (e) => {
    e.preventDefault()
    const newDonor = {
      id: donors.length + 1,
      ...formData,
      lastDonation: 'N/A',
      donations: 0,
      bloodReport: {
        hemoglobin: `${(Math.random() * 2 + 12).toFixed(1)} g/dL`,
        whiteBloodCells: `${(Math.random() * 5 + 4.5).toFixed(1)} K/µL`,
        platelets: `${(Math.random() * 100 + 150).toFixed(0)} K/µL`,
        status: 'Healthy',
        testDate: new Date().toISOString().split('T')[0],
      },
    }
    setDonors([...donors, newDonor])
    setFormData({
      name: '',
      email: '',
      phone: '',
      bloodType: 'O+',
      dob: '',
      address: '',
    })
    setShowForm(false)
  }

  const handleDeleteDonor = (id) => {
    setDonors(donors.filter((donor) => donor.id !== id))
  }

  const getBloodTypeCompatibility = (bloodType) => {
    const compatibility = {
      'O+': ['O+', 'A+', 'B+', 'AB+'],
      'O-': ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      'A+': ['A+', 'AB+'],
      'A-': ['A+', 'A-', 'AB+', 'AB-'],
      'B+': ['B+', 'AB+'],
      'B-': ['B+', 'B-', 'AB+', 'AB-'],
      'AB+': ['AB+'],
      'AB-': ['AB+', 'AB-'],
    }
    return compatibility[bloodType] || []
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Donor Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Donor'}
        </button>
      </div>

      {/* Add Donor Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Register New Donor</h3>
          <form onSubmit={handleAddDonor}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Register Donor
            </button>
          </form>
        </div>
      )}

      {/* Donors List */}
      <div className="card">
        <div className="card-header">
          <h2>Registered Donors</h2>
          <span style={{ color: '#666' }}>{donors.length} donors</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Email</th>
              <th>Phone</th>
              <th>Blood Type</th>
              <th>Last Donation</th>
              <th>Total Donations</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} onClick={() => setSelectedDonor(donor)} style={{ cursor: 'pointer' }}>
                <td>{donor.name}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDeleteDonor(donor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donor Details Modal */}
      {selectedDonor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="card" style={{
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>{selectedDonor.name}</h2>
              <button
                className="btn btn-danger"
                onClick={() => setSelectedDonor(null)}
                style={{ padding: '5px 15px' }}
              >
                Close
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Email</label>
                <p>{selectedDonor.email}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Phone</label>
                <p>{selectedDonor.phone}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Blood Type</label>
                <p><span className="badge badge-primary">{selectedDonor.bloodType}</span></p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Date of Birth</label>
                <p>{selectedDonor.dob}</p>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Address</label>
                <p>{selectedDonor.address || 'N/A'}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Last Donation</label>
                <p>{selectedDonor.lastDonation}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Total Donations</label>
                <p>{selectedDonor.donations}</p>
              </div>
            </div>

            <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />

            <h3 style={{ marginBottom: '15px' }}>Blood Report</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Hemoglobin</label>
                <p>{selectedDonor.bloodReport?.hemoglobin}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>White Blood Cells</label>
                <p>{selectedDonor.bloodReport?.whiteBloodCells}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Platelets</label>
                <p>{selectedDonor.bloodReport?.platelets}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Health Status</label>
                <p>
                  <span className={`badge ${selectedDonor.bloodReport?.status === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
                    {selectedDonor.bloodReport?.status}
                  </span>
                </p>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 'bold', color: '#666' }}>Test Date</label>
                <p>{selectedDonor.bloodReport?.testDate}</p>
              </div>
            </div>

            <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />

            <h3 style={{ marginBottom: '15px' }}>Suitable Blood Types to Receive</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {getBloodTypeCompatibility(selectedDonor.bloodType).map((type) => (
                <span key={type} className="badge badge-info" style={{ padding: '8px 12px', fontSize: '14px' }}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
