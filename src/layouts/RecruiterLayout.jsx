import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  Users,
  Building2,
  LogOut,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Jobs",
    path: "/recruiter/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Post a Job",
    path: "/recruiter/jobs/create",
    icon: PlusCircle,
  },
  {
    label: "Company Profile",
    path: "/recruiter/profile",
    icon: Building2,
  },
];

export default function RecruiterLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <button
          onClick={() => navigate("/recruiter/dashboard")}
          className="text-xl font-bold text-blue-600"
        >
          JobHub
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
          {user?.name?.charAt(0)?.toUpperCase() || "R"}
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b px-6">
          <button
            onClick={() => goTo("/recruiter/dashboard")}
            className="text-2xl font-bold text-blue-600"
          >
            JobHub
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Recruiter Info */}
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
              {user?.name?.charAt(0)?.toUpperCase() || "R"}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {user?.name || "Recruiter"}
              </p>

              <p className="text-sm capitalize text-slate-500">
                Recruiter
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recruiter Panel
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path === "/recruiter/jobs" &&
                location.pathname.startsWith("/recruiter/jobs/") &&
                !location.pathname.includes("/create"));

            return (
              <button
                key={item.path}
                onClick={() => goTo(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}

          <div className="my-5 border-t" />

          <button
            onClick={() => goTo("/jobs")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Search size={19} />
            Browse Jobs
          </button>
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Desktop Topbar */}
        <header className="hidden h-20 items-center justify-between border-b bg-white px-8 lg:flex">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Recruiter Portal
            </h1>

            <p className="text-sm text-slate-500">
              Manage your jobs and candidates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-slate-900">
                {user?.name || "Recruiter"}
              </p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role || "recruiter"}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              {user?.name?.charAt(0)?.toUpperCase() || "R"}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}