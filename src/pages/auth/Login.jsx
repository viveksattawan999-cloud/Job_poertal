import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getDashboardPath, inputClass } from '../../utils/auth'
import { AuthBrand, AuthShell, FormLabel } from '../../components/AuthForm'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const [values, setValues] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  if (isAuthenticated) return <Navigate to={getDashboardPath(user.role)} replace />
  const submit = (event) => { event.preventDefault(); const nextErrors = {}; if (!values.email) nextErrors.email = 'Email is required.'; else if (!emailPattern.test(values.email)) nextErrors.email = 'Enter a valid email address.'; if (!values.password) nextErrors.password = 'Password is required.'; else if (values.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'; if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }; const result = login(values.email, values.password); if (!result.success) { setErrors({ form: result.message }); return } navigate(getDashboardPath(result.user.role), { replace: true }) }
  const update = (field, value) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined, form: undefined })) }
  return <AuthShell><form onSubmit={submit}><AuthBrand /><h1 className="mt-7 text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h1><p className="mt-2 text-sm text-slate-600">Sign in to continue to your account</p>{errors.form && <p className="mt-5 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">{errors.form}</p>}<FormLabel label="Email" error={errors.email}><div className="relative"><Mail size={18} className="pointer-events-none absolute left-3 top-3 text-slate-400" /><input value={values.email} onChange={(event) => update('email', event.target.value)} type="email" autoComplete="email" className={inputClass(errors.email, true)} placeholder="you@example.com" /></div></FormLabel><FormLabel label="Password" error={errors.password}><div className="relative"><LockKeyhole size={18} className="pointer-events-none absolute left-3 top-3 text-slate-400" /><input value={values.password} onChange={(event) => update('password', event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" className={inputClass(errors.password, true)} placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-2.5 rounded p-0.5 text-slate-400 hover:text-brand-600">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></FormLabel><div className="mt-5 flex items-center justify-between gap-3"><label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={values.remember} onChange={(event) => update('remember', event.target.checked)} className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />Remember me</label><a href="/#forgot-password" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Forgot password?</a></div><button className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700">Login</button><p className="mt-6 text-center text-sm text-slate-600">Don&apos;t have an account? <Link className="font-semibold text-brand-600 hover:text-brand-700" to="/register">Register</Link></p><DemoAccounts /></form></AuthShell>
}

function DemoAccounts() { return <div className="mt-6 border-t border-slate-100 pt-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Demo accounts</p><div className="mt-2 space-y-1 text-xs leading-5 text-slate-500"><p><span className="font-semibold text-slate-600">Job Seeker:</span> seeker@test.com · 123456</p><p><span className="font-semibold text-slate-600">Recruiter:</span> recruiter@test.com · 123456</p><p><span className="font-semibold text-slate-600">Admin:</span> admin@test.com · 123456</p></div></div> }

export default Login
