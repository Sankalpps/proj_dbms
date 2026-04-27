import { useState, useEffect } from 'react'

export default function BloodInventory() {
  const [inventory, setInventory] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    bloodType: 'O+',
    units: '',
    expiryDate: '',
    source: '',
  })

  useEffect(() => {
    // Mock data
    setInventory({
      'O+': {
        units: 45,
        lastUpdate: '2024-01-15',
        expiryDate: '2024-04-15',
      },
      'O-': {
        units: 15,
        lastUpdate: '2024-01-14',
        expiryDate: '2024-04-14',
      },
      'A+': {
        units: 28,
        lastUpdate: '2024-01-13',
        expiryDate: '2024-04-13',
      },
      'A-': {
        units: 12,
        lastUpdate: '2024-01-12',
        expiryDate: '2024-04-12',
      },
      'B+': {
        units: 35,
        lastUpdate: '2024-01-11',
        expiryDate: '2024-04-11',
      },
      'B-': {
        units: 8,
        lastUpdate: '2024-01-10',
        expiryDate: '2024-04-10',
      },
      'AB+': {
        units: 10,
        lastUpdate: '2024-01-09',
        expiryDate: '2024-04-09',
      },
      'AB-': {
        units: 5,
        lastUpdate: '2024-01-08',
        expiryDate: '2024-04-08',
      },
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddStock = (e) => {
    e.preventDefault()
    const bloodType = formData.bloodType
    const newUnits = parseInt(formData.units)

    setInventory({
      ...inventory,
      [bloodType]: {
        units: (inventory[bloodType].units || 0) + newUnits,
        lastUpdate: new Date().toISOString().split('T')[0],
        expiryDate: formData.expiryDate,
      },
    })

    setFormData({
      bloodType: 'O+',
      units: '',
      expiryDate: '',
      source: '',
    })
    setShowForm(false)
  }

  const getInventoryStatus = (units) => {
    if (units <= 5) return <span className="badge badge-danger">Critical</span>
    if (units <= 15) return <span className="badge badge-warning">Low</span>
    return <span className="badge badge-success">Adequate</span>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Blood Inventory Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Stock'}
        </button>
      </div>

      {/* Add Stock Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Add Blood Stock</h3>
          <form onSubmit={handleAddStock}>
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
                <label>Units</label>
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
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  placeholder="Blood Bank/Donation Center"
                  value={formData.source}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Add Stock
            </button>
          </form>
        </div>
      )}

      {/* Inventory Summary */}
      <div className="card">
        <div className="card-header">
          <h2>Blood Type Inventory</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Units Available</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(inventory).map(([type, data]) => (
              <tr key={type}>
                <td>
                  <span className="badge badge-primary">{type}</span>
                </td>
                <td>{data.units}</td>
                <td>{getInventoryStatus(data.units)}</td>
                <td>{data.lastUpdate}</td>
                <td>{data.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Summary */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <strong>Total Units in Stock:</strong>
          <strong style={{ color: '#c41e3a', fontSize: '18px' }}>
            {Object.values(inventory).reduce((sum, data) => sum + data.units, 0)}
          </strong>
        </div>
      </div>
    </div>
  )
}
