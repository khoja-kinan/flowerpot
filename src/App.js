import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LandPage from "./pages/LandPage";
import { useTranslation } from "react-i18next";
import Cart from "./pages/Cart";
import OurShop from "./pages/OurShop";
import ShopByOccasionPage from "./pages/ShopByOccasionPage";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import Notfound from "./pages/Notfound";
import IndexDashboard from "./components/dashboard/IndexDashboard";
import DashboardLayout from "./components/dashboard/layouts/dashboard";
import DashboardApp from "./components/dashboard/pages/DashboardApp";
import Flowers from "./components/dashboard/pages/Flowers";
import Users from "./components/dashboard/pages/User";
import RequireAuth from "./components/dashboard/components/RequireAuth";
import { AuthProvider } from "./components/dashboard/context/AuthProvider";
import Carts from "./components/dashboard/pages/Carts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import MobilePayment from "./pages/MobilePayment";
function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  document.documentElement.lang = i18n.language;
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandPage />} replace />
        <Route path="/profile" element={<MyProfile />} replace />
        <Route path="/edit-profile" element={<EditProfile />} replace />
        <Route path="/about" element={<AboutUs />} replace />
        <Route path="/404" element={<Notfound />} replace />
        <Route path="/cart" element={<Cart />} replace />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} replace />
        <Route path="/terms-of-service" element={<TermsOfService />} replace />
        <Route
          path="/shop-by-occasion/:slug"
          element={<ShopByOccasionPage />}
          replace
        />
        <Route path="/our-shop/:categorySlug" element={<OurShop />} replace />

        {/* dashboard */}
        <Route exact path="/dashboard/login" element={<IndexDashboard />} />
        <Route element={<RequireAuth allowedRoles="1" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />

            <Route path="flowers" element={<Flowers />} />
            <Route path="users" element={<Users />} />
            <Route path="carts" element={<Carts />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/404" />} replace />
        <Route path="/mobilePayment" element={<MobilePayment />} replace />
      </Routes>
    </AuthProvider>
  );
}

export default App;
