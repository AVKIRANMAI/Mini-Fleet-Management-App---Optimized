import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'fm_isAuthenticated'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) === true
    } catch {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  const login = useCallback((email, password) => {
    // Assignment rule: valid credentials
    if (email === 'admin@gmail.com' && password === 'admin1234') {
      setIsAuthenticated(true)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials' }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
