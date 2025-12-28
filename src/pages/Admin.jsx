import React, { useMemo, useState, useCallback } from 'react'
import { useFleet } from '../hooks/useFleet'
import FleetForm from '../components/FleetForm'
import FleetList from '../components/FleetList'

export default function Admin() {
  const { fleets, addFleet, updateFleet, deleteFleet, toggleStatus, activeCount } = useFleet()
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [editing, setEditing] = useState(null) // { id, data }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return fleets.filter((f) => {
      const matchesQ =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.licensePlate.toLowerCase().includes(q) ||
        f.driverName.toLowerCase().includes(q)
      const matchesType = typeFilter === 'all' || f.type === typeFilter
      return matchesQ && matchesType
    })
  }, [fleets, query, typeFilter])

  const handleCreate = useCallback(
    (payload) => {
      addFleet(payload)
    },
    [addFleet]
  )

  const startEdit = useCallback((fleet) => {
    setEditing({ id: fleet.id, data: fleet })
  }, [])

  const cancelEdit = useCallback(() => setEditing(null), [])

  const saveEdit = useCallback(
    (id, updates) => {
      updateFleet(id, updates)
      setEditing(null)
    },
    [updateFleet]
  )

  const handleDelete = useCallback((id) => {
    deleteFleet(id)
    if (editing?.id === id) setEditing(null)
  }, [deleteFleet, editing])

  const handleToggle = useCallback((id) => {
    toggleStatus(id)
  }, [toggleStatus])

  return (
    <div>
      <h2>Admin dashboard</h2>

      <section style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="Search by name, plate, driver"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, minWidth: 250 }}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All types</option>
            <option value="truck">truck</option>
            <option value="van">van</option>
            <option value="car">car</option>
          </select>
          <span style={{ fontSize: 12, color: '#555' }}>Active: {activeCount}</span>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card">
          <h3>{editing ? 'Edit fleet' : 'Add fleet'}</h3>
          <FleetForm
            key={editing ? editing.id : 'create-form'}
            initialValues={editing ? editing.data : null}
            onSubmit={(payload) => {
              if (editing) {
                saveEdit(editing.id, payload)
              } else {
                handleCreate(payload)
              }
            }}
            onCancel={editing ? cancelEdit : undefined}
          />
        </div>
        <div className="card">
          <h3>Fleet list</h3>
          <FleetList
            fleets={filtered}
            onEdit={startEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggle}
          />
        </div>
      </section>
    </div>
  )
}
