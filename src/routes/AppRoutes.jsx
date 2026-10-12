import { BrowserRouter, Route, Routes } from "react-router-dom";

import RecruiterLayout from "../layouts/RecruiterLayout";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import RecruiterProfilePage from "../pages/recruiter/RecruiterProfilePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route
            path="dashboard"
            element={<RecruiterDashboard />}
          />
        </Route>
        <Route path="/recruiter" element={<RecruiterLayout />}>
  <Route
    path="dashboard"
    element={<RecruiterDashboard />}
  />

  <Route
    path="profile"
    element={<RecruiterProfilePage />}
  />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;