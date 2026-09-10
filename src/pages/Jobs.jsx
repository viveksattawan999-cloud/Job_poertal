import { ChevronLeft, ChevronRight, Filter, MapPin, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { mockJobs } from '../utils/mockJobs'

const locations = ['Remote', 'Jaipur', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad']
const salaries = [{ label: '0–5 LPA', min: 0, max: 5 }, { label: '5–10 LPA', min: 5, max: 10 }, { label: '10–20 LPA', min: 10, max: 20 }, { label: '20+ LPA', min: 20, max: Infinity }]
const categories = ['IT & Software', 'Finance', 'Marketing', 'Design', 'Sales', 'Healthcare', 'Engineering', 'Education']
const experiences = ['Fresher', '1–3 years', '3–5 years', '5+ years']
const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Remote']
const pageSize = 5

const optionClass = 'flex cursor-pointer items-center gap-2 text-sm text-slate-600'

function FilterGroup({ title, options, selected, onChange }) {
  return <fieldset className="border-b border-slate-100 py-5 last:border-0"><legend className="mb-3 text-sm font-semibold text-slate-900">{title}</legend><div className="space-y-2.5">{options.map((option) => <label className={optionClass} key={option}><input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(option)} className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />{option}</label>)}</div></fieldset>
}

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '')
  const [filters, setFilters] = useState({ locations: [], salaries: [], categories: searchParams.get('category') ? [searchParams.get('category')] : [], experiences: [], jobTypes: [] })
  const [sort, setSort] = useState('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [savedJobs, setSavedJobs] = useState([])
  const toggleFilter = (key, value) => { setCurrentPage(1); setFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] })) }
  const clearFilters = () => { setFilters({ locations: [], salaries: [], categories: [], experiences: [], jobTypes: [] }); setKeyword(''); setSearchLocation(''); setSearchParams({}); setCurrentPage(1) }
  const search = (event) => { event.preventDefault(); const next = {}; if (keyword) next.q = keyword; if (searchLocation) next.location = searchLocation; setSearchParams(next); setCurrentPage(1) }
  const jobs = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    const locationQuery = searchLocation.trim().toLowerCase()
    const filtered = mockJobs.filter((job) => {
      const searchable = [job.title, job.company, job.location, job.category, ...job.skills].join(' ').toLowerCase()
      const salaryMatch = !filters.salaries.length || filters.salaries.some((label) => { const range = salaries.find((salary) => salary.label === label); return job.salaryMax >= range.min && job.salaryMin <= range.max })
      return (!query || searchable.includes(query)) && (!locationQuery || job.location.toLowerCase().includes(locationQuery)) && (!filters.locations.length || filters.locations.includes(job.location)) && (!filters.categories.length || filters.categories.includes(job.category)) && (!filters.experiences.length || filters.experiences.includes(job.experience)) && (!filters.jobTypes.length || filters.jobTypes.includes(job.jobType)) && salaryMatch
    })
    return [...filtered].sort((a, b) => sort === 'high' ? b.salaryMax - a.salaryMax : sort === 'low' ? a.salaryMin - b.salaryMin : mockJobs.indexOf(a) - mockJobs.indexOf(b))
  }, [filters, keyword, searchLocation, sort])
  const totalPages = Math.max(1, Math.ceil(jobs.length / pageSize))
  const visibleJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const toggleSave = (id) => setSavedJobs((saved) => saved.includes(id) ? saved.filter((jobId) => jobId !== id) : [...saved, id])
  const sidebar = <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold text-slate-900"><Filter size={18} />Filters</h2><button onClick={clearFilters} className="text-xs font-semibold text-brand-600 hover:text-brand-700">Clear all</button></div><FilterGroup title="Location" options={locations} selected={filters.locations} onChange={(value) => toggleFilter('locations', value)} /><FilterGroup title="Salary" options={salaries.map((salary) => salary.label)} selected={filters.salaries} onChange={(value) => toggleFilter('salaries', value)} /><FilterGroup title="Job Category" options={categories} selected={filters.categories} onChange={(value) => toggleFilter('categories', value)} /><FilterGroup title="Experience" options={experiences} selected={filters.experiences} onChange={(value) => toggleFilter('experiences', value)} /><FilterGroup title="Job Type" options={jobTypes} selected={filters.jobTypes} onChange={(value) => toggleFilter('jobTypes', value)} /></aside>

  return <section className="bg-slate-50 py-8 sm:py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-2xl bg-slate-900 px-5 py-8 sm:px-8"><h1 className="text-3xl font-bold tracking-tight text-white">Find your next opportunity</h1><form onSubmit={search} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]"><label className="flex items-center gap-2 rounded-lg bg-white px-3 py-3"><Search size={18} className="text-slate-400" /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Job title, company or skills" className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /></label><label className="flex items-center gap-2 rounded-lg bg-white px-3 py-3"><MapPin size={18} className="text-slate-400" /><input value={searchLocation} onChange={(event) => setSearchLocation(event.target.value)} placeholder="City or Remote" className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /></label><button className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500">Search Jobs</button></form></div><div className="mt-7 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"><div className="hidden lg:block">{sidebar}</div><div><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-lg font-bold text-slate-900">{jobs.length ? '245 Jobs Found' : 'No jobs found'}</p><p className="text-sm text-slate-500">Showing matching opportunities from our mock listings.</p></div><div className="flex items-center gap-2"><button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden" onClick={() => setMobileFiltersOpen(true)}><Filter size={16} />Filters</button><select value={sort} onChange={(event) => { setSort(event.target.value); setCurrentPage(1) }} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500"><option value="recent">Most Recent</option><option value="high">Salary: High to Low</option><option value="low">Salary: Low to High</option></select></div></div><div className="space-y-4">{visibleJobs.map((job) => <JobCard key={job.id} job={job} saved={savedJobs.includes(job.id)} onToggleSave={toggleSave} />)}{!visibleJobs.length && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">Try changing your search or clearing the filters.</div>}</div>{jobs.length > pageSize && <div className="mt-7 flex items-center justify-center gap-2"><button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 disabled:opacity-40"><ChevronLeft size={18} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => setCurrentPage(page)} className={`size-9 rounded-lg text-sm font-semibold ${currentPage === page ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{page}</button>)}<button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 disabled:opacity-40"><ChevronRight size={18} /></button></div>}</div></div></div>{mobileFiltersOpen && <div className="fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden"><div className="ml-auto h-full max-w-sm overflow-y-auto rounded-xl bg-white shadow-2xl"><div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white p-5"><p className="font-semibold text-slate-900">Filters</p><button onClick={() => setMobileFiltersOpen(false)} className="rounded-lg p-1 text-slate-500"><X size={20} /></button></div><div className="p-5">{sidebar}</div></div></div>}</section>
}

export default Jobs
