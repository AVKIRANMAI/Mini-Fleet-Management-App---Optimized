import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem' }}>
      <header style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
        <div style={{ marginLeft: 'auto' }}>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <span style={{ fontSize: 14, color: '#555' }}>Not logged in</span>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </div>
  )
}
