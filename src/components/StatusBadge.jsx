const styles = { Applied: 'bg-blue-50 text-blue-700 ring-blue-600/20', Shortlisted: 'bg-violet-50 text-violet-700 ring-violet-600/20', Interview: 'bg-amber-50 text-amber-700 ring-amber-600/20', Selected: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', Rejected: 'bg-red-50 text-red-700 ring-red-600/20' }
function StatusBadge({ status }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || 'bg-slate-100 text-slate-600 ring-slate-500/20'}`}>{status}</span> }
export default StatusBadge
