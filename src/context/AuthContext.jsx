/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const storageKey = 'jobhub_user'
const demoUsers = [
  { email: 'seeker@test.com', password: '123456', role: 'seeker', name: 'Job Seeker' },
  { email: 'recruiter@test.com', password: '123456', role: 'recruiter', name: 'Recruiter' },
  { email: 'admin@test.com', password: '123456', role: 'admin', name: 'Administrator' },
]

const getStoredUser = () => { try { const stored = localStorage.getItem(storageKey); return stored ? JSON.parse(stored) : null } catch { localStorage.removeItem(storageKey); return null } }
const saveUser = (user) => localStorage.setItem(storageKey, JSON.stringify(user))

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const setAuthenticatedUser = (nextUser) => { setUser(nextUser); saveUser(nextUser) }
  const login = (email, password) => {
    const matchedUser = demoUsers.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password)
    if (!matchedUser) return { success: false, message: 'Invalid email or password.' }
    const safeUser = { email: matchedUser.email, role: matchedUser.role, name: matchedUser.name }
    setAuthenticatedUser(safeUser)
    return { success: true, user: safeUser }
  }
  const register = ({ name, email, role, companyName }) => {
    const safeUser = { name: name.trim(), email: email.trim().toLowerCase(), role, ...(role === 'recruiter' ? { companyName: companyName.trim() } : {}) }
    setAuthenticatedUser(safeUser)
    return { success: true, user: safeUser }
  }
  const logout = () => { setUser(null); localStorage.removeItem(storageKey) }
  const value = { user, login, register, logout, isAuthenticated: Boolean(user) }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider.'); return context }
