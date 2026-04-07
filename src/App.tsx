import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Home from './pages/public/Home';
import ForBrands from './pages/public/ForBrands';
import ForCreators from './pages/public/ForCreators';
import Discoveries from './pages/public/Discoveries';
import TheIndex from './pages/public/TheIndex';
import Apply from './pages/public/Apply';
import Login from './pages/public/Login';
import Events from './pages/public/Events';

import BrandDashboard from './pages/dashboard/BrandDashboard';
import BrandProfile from './pages/dashboard/BrandProfile';
import BrandEvents from './pages/dashboard/BrandEvents';

import CreatorDashboard from './pages/dashboard/CreatorDashboard';
import CreatorEvents from './pages/dashboard/CreatorEvents';
import CreatorReviews from './pages/dashboard/CreatorReviews';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminQueue from './pages/dashboard/AdminQueue';
import AdminDirectory from './pages/dashboard/AdminDirectory';

import InternalDocsPortal from './pages/internal/InternalDocsPortal';
import PasswordGate from './components/internal/PasswordGate';

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ className: 'font-sans rounded-xl border-ink/5 shadow-md', style: { background: 'white', color: '#1A1A1A' } }} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<ForBrands />} />
            <Route path="/creators" element={<ForCreators />} />
            <Route path="/discoveries" element={<Discoveries />} />
            <Route path="/the-index" element={<TheIndex />} />
            <Route path="/apply/:type" element={<Apply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
          </Route>
          
          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<BrandDashboard />} />
            <Route path="/dashboard/profile" element={<BrandProfile />} />
            <Route path="/dashboard/events" element={<BrandEvents />} />
            
            <Route path="/dashboard/creator" element={<CreatorDashboard />} />
            <Route path="/dashboard/creator/events" element={<CreatorEvents />} />
            <Route path="/dashboard/creator/reviews" element={<CreatorReviews />} />

            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/queue" element={<AdminQueue />} />
            <Route path="/dashboard/admin/directory" element={<AdminDirectory />} />
          </Route>

          {/* Internal Docs Routes */}
          <Route element={<PasswordGate><InternalDocsPortal /></PasswordGate>}>
            <Route path="/internal/docs" element={<InternalDocsPortal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
