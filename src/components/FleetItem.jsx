import React from 'react'

function FleetItemBase({ fleet, onEdit, onDelete, onToggleStatus }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '0.5rem',
        borderRadius: 4,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center'
      }}
    >
      <div className="card">
  <div>
    <div><strong>Name:</strong> {fleet.name}</div>
    <div><strong>Type:</strong> {fleet.type}</div>
    <div><strong>Status:</strong> {fleet.status}</div>
    <div><strong>Plate:</strong> {fleet.licensePlate}</div>
    <div><strong>Driver:</strong> {fleet.driverName}</div>
  </div>
  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
    <button onClick={onToggleStatus}>
      Toggle {fleet.status === 'active' ? 'inactive' : 'active'}
    </button>
  </div>
</div>
</div>
  )
}

const FleetItem = React.memo(FleetItemBase)
export default FleetItem
