import { mockApplications } from './mockApplications'

const applicationsKey = 'jobhub_applications'
const savedJobsKey = 'jobhub_saved_jobs'
export const profileKey = 'jobhub_seeker_profile'
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback } }
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getApplications = (email) => { const apps = read(applicationsKey, null); if (!apps) { write(applicationsKey, mockApplications); return mockApplications.filter((app) => app.applicantId === email) }; return apps.filter((app) => app.applicantId === email) }
export const createApplication = (application) => { const apps = read(applicationsKey, mockApplications); write(applicationsKey, [...apps, application]) }
export const getSavedJobIds = () => read(savedJobsKey, [])
export const toggleSavedJob = (jobId) => { const current = getSavedJobIds(); const next = current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId]; write(savedJobsKey, next); return next }
export const getProfile = () => read(profileKey, null)
export const saveProfile = (profile) => write(profileKey, profile)
