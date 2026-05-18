import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import CertificatePage from "./pages/CertificatePage";
import SustainabilityImpact from "./pages/SustainabilityImpact";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import Blog from "./pages/Blog";
import SolarCalculator from "./pages/SolarCaculator";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VendorManagement from "./pages/VendorManagement";
import BlogManagement from "./pages/BlogManagement";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import VendorAccounts from "./pages/VendorAccounts";

import Navbar from "@/components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import VendorProtectedRoute from "./components/VendorProtectedRoute";

const queryClient = new QueryClient();

/* Layout component */
const Layout = ({ children }) => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isVendorRoute = location.pathname.startsWith("/vendor");

  return (
    <>
      {!isAdminRoute && !isVendorRoute && <Navbar />}
      <ScrollToTop />
      {children}
      {!isAdminRoute && !isVendorRoute && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ HashRouter is REQUIRED for GitHub Pages */}
      <HashRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/sustainability" element={<SustainabilityImpact />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/career/:slug" element={<JobDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/calculator" element={<SolarCalculator />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vendor-management"
              element={
                <ProtectedRoute>
                  <VendorManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vendor-accounts"
              element={
                <ProtectedRoute>
                  <VendorAccounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog-management"
              element={
                <ProtectedRoute>
                  <BlogManagement />
                </ProtectedRoute>
              }
            />

            {/* Vendor Routes */}
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route
              path="/vendor/dashboard"
              element={
                <VendorProtectedRoute>
                  <VendorDashboard />
                </VendorProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
