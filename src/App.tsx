import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Creations from './pages/Creations'
import ProjectDetail from './pages/ProjectDetail'
import OurStory from './pages/OurStory'
import Hospitality from './pages/Hospitality'
import Careers from './pages/Careers'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true');
    setIsAuthenticated(true);
  };

  return (
    <>
      <ScrollToTop />
      <div className="proto-tag">DESIGN PROTOTYPE — for review only</div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="creations" element={<Creations />} />
          <Route path="project/:slug" element={<ProjectDetail />} />
          <Route path="story" element={<OurStory />} />
          <Route path="hospitality" element={<Hospitality />} />
          <Route path="careers" element={<Careers />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Admin /> : <Navigate to="/admin/login" replace />} 
        />
      </Routes>
    </>
  )
}
