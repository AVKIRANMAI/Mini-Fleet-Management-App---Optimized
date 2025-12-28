import React, { useMemo, useState } from 'react'
import { isNonEmpty, isPlate, isShortText } from '../utils/validate'

const empty = {
  name: '',
  type: 'truck',
  status: 'active',
  licensePlate: '',
  driverName: ''
}

export default function FleetForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => initialValues || empty)
  const [errors, setErrors] = useState({})

  const isEdit = useMemo(() => Boolean(initialValues), [initialValues])

  const validate = (v) => {
    const e = {}
    if (!isNonEmpty(v.name) || !isShortText(v.name)) e.name = 'Name required (max 50 chars)'
    if (!['truck', 'van', 'car'].includes(v.type)) e.type = 'Type must be truck, van, or car'
    if (!['active', 'inactive'].includes(v.status)) e.status = 'Status must be active or inactive'
    if (!isPlate(v.licensePlate)) e.licensePlate = 'License plate must be alphanumeric/hyphen'
    if (!isNonEmpty(v.driverName) || !isShortText(v.driverName)) e.driverName = 'Driver name required (max 50 chars)'
    return e
  }

  const handleChange = (field, val) => {
    setValues((prev) => ({ ...prev, [field]: val }))
  }

  const submit = (e) => {
    e.preventDefault()
    const eMap = validate(values)
    setErrors(eMap)
    if (Object.keys(eMap).length === 0) {
      onSubmit(values)
      if (!isEdit) setValues(empty)
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: '0.5rem', maxWidth: 420 }}>
      <label>
        <div>Name</div>
        <input value={values.name} onChange={(e) => handleChange('name', e.target.value)} />
        {errors.name && <span style={{ color: 'crimson', fontSize: 12 }}>{errors.name}</span>}
      </label>

      <label>
        <div>Type</div>
        <select value={values.type} onChange={(e) => handleChange('type', e.target.value)}>
          <option value="truck">truck</option>
          <option value="van">van</option>
          <option value="car">car</option>
        </select>
        {errors.type && <span style={{ color: 'crimson', fontSize: 12 }}>{errors.type}</span>}
      </label>

      <label>
        <div>Status</div>
        <select value={values.status} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        {errors.status && <span style={{ color: 'crimson', fontSize: 12 }}>{errors.status}</span>}
      </label>

      <label>
        <div>License plate</div>
        <input value={values.licensePlate} onChange={(e) => handleChange('licensePlate', e.target.value)} />
        {errors.licensePlate && <span style={{ color: 'crimson', fontSize: 12 }}>{errors.licensePlate}</span>}
      </label>

      <label>
        <div>Driver name</div>
        <input value={values.driverName} onChange={(e) => handleChange('driverName', e.target.value)} />
        {errors.driverName && <span style={{ color: 'crimson', fontSize: 12 }}>{errors.driverName}</span>}
      </label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit">{isEdit ? 'Save changes' : 'Add fleet'}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
