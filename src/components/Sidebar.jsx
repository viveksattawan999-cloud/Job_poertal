import { Bookmark, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, Search, UserRound, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [{ to: '/seeker/dashboard', label: 'Dashboard', icon: LayoutDashboard }, { to: '/seeker/profile', label: 'My Profile', icon: UserRound }, { to: '/seeker/applications', label: 'Applications', icon: FileText }, { to: '/seeker/saved-jobs', label: 'Saved Jobs', icon: Bookmark }, { to: '/jobs', label: 'Find Jobs', icon: Search }]

function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); onClose?.(); navigate('/', { replace: true }) }
  const content = <div className="flex h-full flex-col bg-slate-900 p-4 text-slate-300"><div className="flex items-center justify-between px-2 py-2"><NavLink to="/" onClick={onClose} className="flex items-center gap-2 text-xl font-bold text-white"><span className="grid size-8 place-items-center rounded-lg bg-brand-600"><BriefcaseBusiness size={18} /></span>JobHub</NavLink><button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"><X size={20} /></button></div><div className="mt-8 space-y-1">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-brand-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}><Icon size={18} />{label}</NavLink>)}</div><div className="mt-auto border-t border-slate-800 pt-4"><p className="px-3 text-sm font-semibold text-white">{user?.name}</p><p className="mt-0.5 px-3 text-xs text-slate-400">Job Seeker</p><button onClick={handleLogout} className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"><LogOut size={18} />Logout</button></div></div>
  return <><aside className="hidden w-64 shrink-0 lg:block">{content}</aside>{open && <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden"><aside className="h-full w-72 shadow-2xl">{content}</aside></div>}</>
}
export default Sidebar
