import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import { useStatsStore } from './store/statsStore';
import { useStoreSync } from './hooks/useStoreSync';
import { useAuth } from './hooks/useDatabaseIntegration';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Brochures from './pages/Brochures';
import Dashboard from './pages/admin/Dashboard';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ServicesManager from './pages/admin/ServicesManager';
import ProjectsManager from './pages/admin/ProjectsManager';
import PartnersManager from './pages/admin/PartnersManager';
import ClientsManager from './pages/admin/ClientsManager';
import UserManager from './pages/admin/UserManager';
import Settings from './pages/admin/Settings';
import ContactSubmissions from './pages/admin/ContactSubmissions';
import LogoManager from './pages/admin/LogoManager';
import BrochuresManager from './pages/admin/BrochuresManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import CRUDTestingDashboard from './pages/admin/CRUDTestingDashboard';
import AuthTestDashboard from './pages/admin/AuthTestDashboard';

const VisitorTracker = () => {
  const location = useLocation();
  const incrementVisitors = useStatsStore((state) => state.incrementVisitors);

  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      incrementVisitors();
    }
  }, [location.pathname]);

  return null;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize Supabase authentication service
  useAuth();
  return <>{children}</>;
};

function App() {
  // Initialize store sync
  useStoreSync();

  return (
    <Router>
      <AuthProvider>
        <PerformanceOptimizer />
        <VisitorTracker />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/brochures" element={<Brochures />} />
              <Route path="/admin/login" element={<LoginForm />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/services" element={<ServicesManager />} />
                      <Route path="/projects" element={<ProjectsManager />} />
                      <Route path="/clients" element={<ClientsManager />} />
                      <Route path="/partners" element={<PartnersManager />} />
                      <Route path="/users" element={<UserManager />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/contacts" element={<ContactSubmissions />} />
                      <Route path="/logo" element={<LogoManager />} />
                      <Route path="/brochures" element={<BrochuresManager />} />
                      <Route path="/portfolio" element={<PortfolioManager />} />
                      <Route path="/crud-testing" element={<CRUDTestingDashboard />} />
                      <Route path="/auth-testing" element={<AuthTestDashboard />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;