import { BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"><div><Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900"><span className="grid size-9 place-items-center rounded-lg bg-brand-600 text-white"><BriefcaseBusiness size={19} /></span>JobHub</Link><p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">A better way to discover work that moves your career forward.</p></div><FooterColumn title="JobHub" links={['About', 'Companies', 'Find Jobs']} /><FooterColumn title="For Job Seekers" links={['Browse Jobs', 'Career Advice', 'Saved Jobs']} /><FooterColumn title="For Recruiters" links={['Post a Job', 'Hiring Solutions', 'Support']} /></div><div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} JobHub. All rights reserved.</span><div className="flex gap-5"><a href="/#privacy" className="hover:text-brand-600">Privacy</a><a href="/#terms" className="hover:text-brand-600">Terms</a></div></div></div></footer>
}

function FooterColumn({ title, links }) { return <div><h2 className="text-sm font-semibold text-slate-900">{title}</h2><ul className="mt-4 space-y-3">{links.map((link) => <li key={link}><Link to={link === 'Find Jobs' || link === 'Browse Jobs' ? '/jobs' : link === 'Post a Job' ? '/register' : '/'} className="text-sm text-slate-500 transition hover:text-brand-600">{link}</Link></li>)}</ul></div> }

export default Footer
