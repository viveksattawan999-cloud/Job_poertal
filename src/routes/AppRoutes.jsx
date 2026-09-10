import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import SeekerLayout from "../layouts/SeekerLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/auth/Unauthorized";

import Dashboard from "../pages/seeker/Dashboard";
import Profile from "../pages/seeker/Profile";
import Applications from "../pages/seeker/Applications";
import SavedJobs from "../pages/seeker/SavedJobs";
import ApplyJob from "../pages/seeker/ApplyJob";

import RecruiterDashboard from "../pages/recruiter/dashboard";
import RecruiterProfile from "../pages/recruiter/Profile";

// These will be used in later recruiter steps
import RecruiterJobsPage from "../pages/recruiter/RecruiterJobsPage";
import CreateJobPage from "../pages/recruiter/CreateJobPage";
import EditJobPage from "../pages/recruiter/EditJobPage";
import ApplicantsPage from "../pages/recruiter/ApplicantsPage";

import AdminApplicationsPage from "../pages/admin/AdminApplicationsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";
import RecruitersPage from "../pages/admin/RecruitersPage";
import UsersPage from "../pages/admin/UsersPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC / MAIN LAYOUT
        ========================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>


        {/* =========================
            JOB SEEKER
        ========================== */}

        <Route
          path="/seeker"
          element={
            <ProtectedRoute allowedRoles={["seeker"]}>
              <SeekerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="profile" element={<Profile />} />

          <Route path="applications" element={<Applications />} />

          <Route path="saved-jobs" element={<SavedJobs />} />

          <Route path="apply/:jobId" element={<ApplyJob />} />
        </Route>


        {/* =========================
            RECRUITER
        ========================== */}

        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<RecruiterDashboard />}
          />

          <Route
            path="profile"
            element={<RecruiterProfile />}
          />

          <Route
            path="jobs"
            element={<RecruiterJobsPage />}
          />

          <Route
            path="jobs/create"
            element={<CreateJobPage />}
          />

          <Route
            path="jobs/:id/edit"
            element={<EditJobPage />}
          />

          <Route
            path="jobs/:id/applicants"
            element={<ApplicantsPage />}
          />
        </Route>


        {/* =========================
            ADMIN
        ========================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recruiters"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RecruitersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminJobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApplicationsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;