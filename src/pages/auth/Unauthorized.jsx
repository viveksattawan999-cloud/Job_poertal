import { ShieldAlert } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getDashboardPath } from '../../utils/auth'

function Unauthorized() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-10"><div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-red-600"><ShieldAlert size={28} /></div><p className="mt-6 text-5xl font-bold tracking-tight text-slate-900">403</p><h1 className="mt-2 text-2xl font-bold text-slate-900">Access Denied</h1><p className="mt-3 text-slate-600">You don&apos;t have permission to access this page.</p><button onClick={() => navigate(getDashboardPath(user.role), { replace: true })} className="mt-7 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">Go to Dashboard</button></div></section>
}

export default Unauthorized
