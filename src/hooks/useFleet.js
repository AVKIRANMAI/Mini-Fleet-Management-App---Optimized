import { useCallback, useEffect, useMemo, useState } from 'react'

const LS_KEY = 'fm_fleets'

const createId = () => Math.random().toString(36).slice(2, 10)

export function useFleet() {
  const [fleets, setFleets] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(fleets))
  }, [fleets])

  const addFleet = useCallback((payload) => {
    setFleets((prev) => [...prev, { ...payload, id: createId() }])
  }, [])

  const updateFleet = useCallback((id, updates) => {
    setFleets((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }, [])

  const deleteFleet = useCallback((id) => {
    setFleets((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const toggleStatus = useCallback((id) => {
    setFleets((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f))
    )
  }, [])

  // Example derived data optimization
  const activeCount = useMemo(() => fleets.filter((f) => f.status === 'active').length, [fleets])

  return { fleets, addFleet, updateFleet, deleteFleet, toggleStatus, activeCount }
}
