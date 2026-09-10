import { Bookmark, BriefcaseBusiness, Clock3, IndianRupee, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatSalary } from '../utils/mockJobs'
import { getSavedJobIds, toggleSavedJob } from '../utils/seekerStorage'

function JobCard({ job, onSavedChange }) {
  const [saved, setSaved] = useState(() => getSavedJobIds().includes(job.id))
  const handleSave = () => { const next = toggleSavedJob(job.id); setSaved(next.includes(job.id)); onSavedChange?.(next) }
  return <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 font-bold text-brand-700">{job.companyLogo}</div><div className="min-w-0 flex-1"><div className="flex gap-3"><div className="min-w-0 flex-1"><Link to={`/jobs/${job.id}`} className="block truncate text-lg font-semibold text-slate-900 group-hover:text-brand-700">{job.title}</Link><p className="mt-0.5 text-sm font-medium text-slate-600">{job.company}</p></div><button type="button" onClick={handleSave} aria-label={`Save ${job.title}`} className={`rounded-lg p-2 transition ${saved ? 'bg-brand-50 text-brand-600' : 'text-slate-400 hover:bg-slate-50 hover:text-brand-600'}`}><Bookmark size={19} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500"><span className="inline-flex items-center gap-1.5"><MapPin size={16} />{job.location}</span><span className="inline-flex items-center gap-1.5"><IndianRupee size={16} />{formatSalary(job)}</span><span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={16} />{job.experience}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={16} />{job.postedAt}</span></div><div className="mt-4 flex items-center justify-between gap-3"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{job.jobType}</span><Link to={`/jobs/${job.id}`} className="rounded-lg border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">View Details</Link></div></div></div></article>
}

export default JobCard
