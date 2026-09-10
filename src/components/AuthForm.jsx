import { BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AuthShell({ children }) { return <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-10 sm:px-6"><div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 sm:p-8">{children}</div></section> }
export function AuthBrand() { return <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"><span className="grid size-9 place-items-center rounded-lg bg-brand-600 text-white"><BriefcaseBusiness size={20} /></span>JobHub</Link> }
export function FormLabel({ label, error, children }) { return <label className="mt-5 block text-sm font-medium text-slate-700"><span>{label}</span><div className="mt-2">{children}</div>{error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}</label> }
