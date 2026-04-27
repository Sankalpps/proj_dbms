import { useState, useEffect } from 'react'

export default function StaffManagement() {
  const [staff, setStaff] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'phlebotomist',
    department: '',
    joinDate: '',
  })

  useEffect(() => {
    // Mock data
    setStaff([
      {
        id: 1,
        name: 'Dr. Emily Chen',
        email: 'emily.chen@hospital.com',
        phone: '555-0201',
        role: 'Medical Director',
        department: 'Blood Bank',
        joinDate: '2020-03-15',
        status: 'Active',
      },
      {
        id: 2,
        name: 'James Wilson',
        email: 'james.wilson@hospital.com',
        phone: '555-0202',
        role: 'Phlebotomist',
        department: 'Collection',
        joinDate: '2021-07-20',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@hospital.com',
        phone: '555-0203',
        role: 'Lab Technician',
        department: 'Testing',
        joinDate: '2022-01-10',
        status: 'Active',
      },
      {
        id: 4,
        name: 'Mark Thompson',
        email: 'mark.thompson@hospital.com',
        phone: '555-0204',
        role: 'Administrative Staff',
        department: 'Administration',
        joinDate: '2021-11-05',
        status: 'Active',
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

  const handleAddStaff = (e) => {
    e.preventDefault()
    const newStaff = {
      id: staff.length + 1,
      ...formData,
      status: 'Active',
    }
    setStaff([...staff, newStaff])
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'phlebotomist',
      department: '',
      joinDate: '',
    })
    setShowForm(false)
  }

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((member) => member.id !== id))
  }

  const handleUpdateStatus = (id, status) => {
    setStaff(
      staff.map((member) =>
        member.id === id ? { ...member, status } : member
      )
    )
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Medical Director':
        return 'badge-danger'
      case 'Phlebotomist':
        return 'badge-primary'
      case 'Lab Technician':
        return 'badge-success'
      case 'Administrative Staff':
        return 'badge-warning'
      default:
        return 'badge-primary'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Staff Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Staff Member'}
        </button>
      </div>

      {/* Add Staff Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Register New Staff Member</h3>
          <form onSubmit={handleAddStaff}>
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
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="Medical Director">Medical Director</option>
                  <option value="Phlebotomist">Phlebotomist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Administrative Staff">Administrative Staff</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Add Staff Member
            </button>
          </form>
        </div>
      )}

      {/* Staff List */}
      <div className="card">
        <div className="card-header">
          <h2>Staff Members</h2>
          <span style={{ color: '#666' }}>{staff.length} staff members</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <span className={`badge ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </td>
                <td>{member.department}</td>
                <td>{member.joinDate}</td>
                <td>
                  <span className="badge badge-success">{member.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDeleteStaff(member.id)}
                  >
                    Remove
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
