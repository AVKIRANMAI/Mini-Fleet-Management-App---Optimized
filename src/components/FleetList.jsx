import React, { useMemo } from 'react'
import FleetItem from './FleetItem'

export default function FleetList({ fleets, onEdit, onDelete, onToggleStatus }) {
  const sorted = useMemo(() => {
    // Stable sort by name asc
    return [...fleets].sort((a, b) => a.name.localeCompare(b.name))
  }, [fleets])

  if (sorted.length === 0) return <div>No fleet entries yet.</div>

  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {sorted.map((f) => (
        <FleetItem
          key={f.id}
          fleet={f}
          onEdit={() => onEdit(f)}
          onDelete={() => onDelete(f.id)}
          onToggleStatus={() => onToggleStatus(f.id)}
        />
      ))}
    </div>
  )
}
