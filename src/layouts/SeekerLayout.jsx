import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

function SeekerLayout() { const [open, setOpen] = useState(false); return <div className="flex min-h-screen bg-slate-50"><Sidebar open={open} onClose={() => setOpen(false)} /><div className="min-w-0 flex-1"><header className="flex items-center border-b border-slate-200 bg-white px-4 py-4 lg:hidden"><button onClick={() => setOpen(true)} aria-label="Open seeker navigation" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Menu size={21} /></button><span className="ml-3 font-bold text-slate-900">JobHub</span></header><main><Outlet /></main></div></div> }
export default SeekerLayout
