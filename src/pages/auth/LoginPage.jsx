import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const dashboards = { seeker: '/seeker/dashboard', recruiter: '/recruiter/dashboard', admin: '/admin/dashboard' }

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const handleSubmit = (event) => { event.preventDefault(); const result = login(email, password); if (!result.success) { setError(result.message); return }; navigate(location.state?.from?.pathname || dashboards[result.user.role], { replace: true }) }

  return <section className="mx-auto flex max-w-7xl justify-center px-4 py-14 sm:px-6 lg:px-8"><form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}><h1 className="text-2xl font-bold text-slate-900">Welcome back</h1><p className="mt-2 text-sm text-slate-600">Sign in to access your JobHub workspace.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<label className="mt-6 block text-sm font-medium text-slate-700">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label><label className="mt-4 block text-sm font-medium text-slate-700">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label><button className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700">Sign in</button><p className="mt-5 text-center text-sm text-slate-600">New to JobHub? <Link className="font-semibold text-brand-600" to="/register">Create an account</Link></p><p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">Test accounts: seeker@test.com, recruiter@test.com, or admin@test.com. Password: 123456</p></form></section>
}

export default LoginPage
