export const dashboardPaths = { seeker: '/seeker/dashboard', recruiter: '/recruiter/dashboard', admin: '/admin/dashboard' }
export const profilePaths = { seeker: '/seeker/profile', recruiter: '/recruiter/profile' }
export const getDashboardPath = (role) => dashboardPaths[role] || '/'
export const formatRole = (role) => role ? `${role.charAt(0).toUpperCase()}${role.slice(1)}` : ''
export const inputClass = (hasError, hasIcon = false) => `w-full rounded-lg border bg-white py-2.5 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${hasIcon ? 'pl-10' : 'pl-3'} ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'}`
