import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";

import NotFound from "./pages/Page404";

import Unauthorized from "./pages/Unauthorized";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LogoOnlyLayout />}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/404" />} replace />
    </Routes>
  );
}
