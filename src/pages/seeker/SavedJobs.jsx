import { Bookmark } from 'lucide-react'
import { useState } from 'react'
import EmptyState from '../../components/EmptyState'
import JobCard from '../../components/JobCard'
import { mockJobs } from '../../utils/mockJobs'
import { getSavedJobIds } from '../../utils/seekerStorage'
function SavedJobs() { const [ids, setIds] = useState(getSavedJobIds); const jobs = mockJobs.filter((job) => ids.includes(job.id)); return <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8"><h1 className="text-3xl font-bold tracking-tight text-slate-900">Saved Jobs</h1><p className="mt-2 text-slate-600">Keep track of the opportunities you want to revisit.</p><div className="mt-7 grid gap-4 xl:grid-cols-2">{jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} onSavedChange={setIds} />) : <div className="xl:col-span-2"><EmptyState icon={Bookmark} title="No saved jobs." description="Save jobs you're interested in and find them here later." actionLabel="Find Jobs" actionTo="/jobs" /></div>}</div></div> }
export default SavedJobs
