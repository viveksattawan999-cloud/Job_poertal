import { BadgeCheck, CalendarDays, FileText, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import JobCard from '../../components/JobCard'
import ProfileCompletion from '../../components/ProfileCompletion'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { mockJobs } from '../../utils/mockJobs'
import { getApplications, getProfile } from '../../utils/seekerStorage'

function Dashboard() {
  const { user } = useAuth()
  const applications = getApplications(user.email)
  const profile = getProfile()
  const stats = [{ label: 'Applications', value: applications.length, icon: FileText, tone: 'blue' }, { label: 'Shortlisted', value: applications.filter((app) => app.status === 'Shortlisted').length, icon: ListChecks, tone: 'violet' }, { label: 'Interviews', value: applications.filter((app) => app.status === 'Interview').length, icon: CalendarDays, tone: 'amber' }, { label: 'Selected', value: applications.filter((app) => app.status === 'Selected').length, icon: BadgeCheck, tone: 'emerald' }]
  return <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8"><h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {user.name}</h1><p className="mt-2 text-slate-600">Find your next opportunity.</p><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div><div className="mt-6"><ProfileCompletion profile={profile} user={user} /></div><section className="mt-8"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-slate-900">Recent Applications</h2><p className="mt-1 text-sm text-slate-500">Keep up with your latest application activity.</p></div><Link to="/seeker/applications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all</Link></div><div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="hidden grid-cols-[1.5fr_1fr_1fr_auto] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid"><span>Job</span><span>Applied Date</span><span>Status</span><span>Action</span></div>{applications.slice(0, 3).map((app) => <div key={app.id} className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center"><div><p className="font-semibold text-slate-900">{app.jobTitle}</p><p className="text-sm text-slate-500">{app.company}</p></div><p className="text-sm text-slate-600">{app.appliedAt}</p><div><StatusBadge status={app.status} /></div><Link to="/seeker/applications" className="text-sm font-semibold text-brand-600">View</Link></div>)}</div></section><section className="mt-8"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-slate-900">Recommended Jobs</h2><p className="mt-1 text-sm text-slate-500">Roles matched to the skills in your profile.</p></div><Link to="/jobs" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Explore jobs</Link></div><div className="mt-4 grid gap-4 xl:grid-cols-2">{mockJobs.slice(0, 4).map((job) => <JobCard key={job.id} job={job} />)}</div></section></div>
}
export default Dashboard
