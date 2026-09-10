import {
  BriefcaseBusiness,
  Users,
  CalendarDays,
  UserCheck,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Active Jobs",
    value: "12",
    change: "+3 this month",
    icon: BriefcaseBusiness,
  },
  {
    title: "Total Applicants",
    value: "248",
    change: "+24 this week",
    icon: Users,
  },
  {
    title: "Interviews",
    value: "32",
    change: "+8 this month",
    icon: CalendarDays,
  },
  {
    title: "Selected",
    value: "8",
    change: "+2 this month",
    icon: UserCheck,
  },
];

const recentJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    location: "Jaipur",
    applicants: 34,
    status: "Active",
    posted: "Aug 28, 2026",
  },
  {
    id: 2,
    title: "Backend Node.js Developer",
    location: "Delhi",
    applicants: 28,
    status: "Active",
    posted: "Aug 26, 2026",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    applicants: 21,
    status: "Active",
    posted: "Aug 24, 2026",
  },
  {
    id: 4,
    title: "Data Analyst",
    location: "Mumbai",
    applicants: 18,
    status: "Closed",
    posted: "Aug 20, 2026",
  },
];

const recentApplicants = [
  {
    name: "Rahul Sharma",
    job: "Senior React Developer",
    date: "Aug 30, 2026",
    status: "Shortlisted",
  },
  {
    name: "Priya Singh",
    job: "UI/UX Designer",
    date: "Aug 29, 2026",
    status: "Interview",
  },
  {
    name: "Aman Kumar",
    job: "Backend Node.js Developer",
    date: "Aug 28, 2026",
    status: "Applied",
  },
  {
    name: "Neha Verma",
    job: "Data Analyst",
    date: "Aug 27, 2026",
    status: "Selected",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700",
    Closed: "bg-slate-100 text-slate-600",
    Applied: "bg-blue-50 text-blue-700",
    Shortlisted: "bg-purple-50 text-purple-700",
    Interview: "bg-amber-50 text-amber-700",
    Selected: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function RecruiterDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Dashboard
          </h2>

          <p className="mt-1 text-slate-500">
            Manage your job postings and find the right candidates.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <BriefcaseBusiness size={18} />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-green-600">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Jobs */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-5 sm:px-6">
          <div>
            <h3 className="font-semibold text-slate-900">Recent Jobs</h3>
            <p className="mt-1 text-sm text-slate-500">
              Your latest job postings
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4 font-semibold">Job</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Applicants</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Posted</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>

            <tbody>
              {recentJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {job.title}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {job.location}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {job.applicants}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {job.posted}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="More options"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y md:hidden">
          {recentJobs.map((job) => (
            <div key={job.id} className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {job.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.location}
                  </p>
                </div>

                <StatusBadge status={job.status} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  {job.applicants} applicants
                </span>

                <span className="text-slate-400">{job.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Applicants */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-5 sm:px-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Recent Applicants
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Candidates who recently applied
            </p>
          </div>

          <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="divide-y">
          {recentApplicants.map((applicant) => (
            <div
              key={applicant.name}
              className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                  {applicant.name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    {applicant.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {applicant.job}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <span className="text-sm text-slate-400">
                  {applicant.date}
                </span>

                <StatusBadge status={applicant.status} />

                <button
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label={`View ${applicant.name}`}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}