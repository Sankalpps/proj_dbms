import { useState, useEffect } from 'react'

export default function DonorManagement() {
  const [donors, setDonors] = useState([])
  const [showForm, setShowForm] = useState(false)
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
    setDonors([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0101',
        bloodType: 'O+',
        dob: '1990-05-15',
        lastDonation: '2024-01-10',
        donations: 5,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0102',
        bloodType: 'A-',
        dob: '1992-08-22',
        lastDonation: '2024-01-05',
        donations: 3,
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '555-0103',
        bloodType: 'B+',
        dob: '1988-03-10',
        lastDonation: '2024-01-12',
        donations: 8,
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
              <th>Email</th>
              <th>Phone</th>
              <th>Blood Type</th>
              <th>Last Donation</th>
              <th>Total Donations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.email}</td>
                <td>{donor.phone}</td>
                <td>
                  <span className="badge badge-primary">{donor.bloodType}</span>
                </td>
                <td>{donor.lastDonation}</td>
                <td>{donor.donations}</td>
                <td>
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
    </div>
  )
}
