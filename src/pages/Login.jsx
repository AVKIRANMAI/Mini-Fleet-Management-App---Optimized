import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setError('')
      const res = login(email.trim(), password.trim())
      if (res.ok) {
        navigate(from, { replace: true })
      } else {
        setError(res.error || 'Login failed')
      }
    },
    [email, password, login, navigate, from]
  )

  if (isAuthenticated) {
    navigate('/admin', { replace: true })
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          <div>Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin"
            autoComplete="username"
          />
        </label>

        <label>
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin"
            autoComplete="current-password"
          />
        </label>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}

        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '0.5rem', fontSize: 12, color: '#666' }}>
        Hint: email "admin", password "admin"
      </p>
    </div>
  )
}
