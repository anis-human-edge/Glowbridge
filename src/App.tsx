import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import BrandDashboardLayout from './layouts/BrandDashboardLayout';
import CreatorDashboardLayout from './layouts/CreatorDashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import NativeAuthLayout from './layouts/NativeAuthLayout';

// Public Pages
import Home from './pages/public/Home';
import ForBrands from './pages/public/ForBrands';
import ForCreators from './pages/public/ForCreators';
import EventPage from './pages/public/EventPage';

// Auth Pages (Supabase Native)
import RegisterBrand from './pages/auth/RegisterBrand';
import RegisterCreator from './pages/auth/RegisterCreator';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';

// Brand Pages
import BrandDashboard from './pages/brand/Dashboard';
import ProductNew from './pages/brand/ProductNew';
import ProductDetail from './pages/brand/ProductDetail';
import ProductPreview from './pages/brand/ProductPreview';
import BrandIntelligence from './pages/brand/Intelligence';
import BrandFeedback from './pages/brand/Feedback';
import BrandCreators from './pages/brand/Creators';
import BrandMessages from './pages/brand/Messages';
import BrandEventApply from './pages/brand/EventApply';
import BrandEventStatus from './pages/brand/EventStatus';
import BrandEventNight from './pages/brand/EventNight';
import BrandDeals from './pages/brand/Deals';
import BrandResults from './pages/brand/Results';
import BrandSettingsProfile from './pages/brand/SettingsProfile';

// Creator Pages
import CreatorDashboard from './pages/creator/Dashboard';
import CreatorProfileEdit from './pages/creator/ProfileEdit';
import CreatorProfilePreview from './pages/creator/ProfilePreview';
import CreatorProducts from './pages/creator/Products';
import CreatorMyReviews from './pages/creator/MyReviews';
import CreatorBrands from './pages/creator/Brands';
import CreatorMessages from './pages/creator/Messages';
import CreatorStanding from './pages/creator/Standing';
import CreatorEventRegister from './pages/creator/EventRegister';
import CreatorEventNight from './pages/creator/EventNight';
import CreatorDeals from './pages/creator/Deals';
import CreatorSettings from './pages/creator/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBrands from './pages/admin/Brands';
import AdminCreators from './pages/admin/Creators';
import AdminProducts from './pages/admin/Products';
import AdminScoring from './pages/admin/Scoring';
import AdminCycle from './pages/admin/Cycle';
import AdminDeals from './pages/admin/Deals';
import AdminMessages from './pages/admin/Messages';
import AdminAnalytics from './pages/admin/Analytics';

// Password gate (from original)
import InternalDocsPortal from './pages/internal/InternalDocsPortal';
import PasswordGate from './components/internal/PasswordGate';

function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" toastOptions={{ className: 'font-sans rounded-xl border-ink/5 shadow-md', style: { background: 'white', color: '#1A1A1A' } }} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<ForBrands />} />
            <Route path="/creators" element={<ForCreators />} />
            <Route path="/event" element={<EventPage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<NativeAuthLayout />}>
            <Route path="/auth/register/brand" element={<RegisterBrand />} />
            <Route path="/auth/register/creator" element={<RegisterCreator />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
          </Route>
          
          {/* Brand Role Routes */}
          <Route path="/brand" element={<ProtectedRoute allowedRoles={['brand']}><BrandDashboardLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<BrandDashboard />} />
            <Route path="product/new" element={<ProductNew />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="product/:id/preview" element={<ProductPreview />} />
            <Route path="intelligence" element={<BrandIntelligence />} />
            <Route path="feedback" element={<BrandFeedback />} />
            <Route path="creators" element={<BrandCreators />} />
            <Route path="messages" element={<BrandMessages />} />
            <Route path="event/apply" element={<BrandEventApply />} />
            <Route path="event/status" element={<BrandEventStatus />} />
            <Route path="event/night" element={<BrandEventNight />} />
            <Route path="deals" element={<BrandDeals />} />
            <Route path="results" element={<BrandResults />} />
            <Route path="settings/profile" element={<BrandSettingsProfile />} />
          </Route>

          {/* Creator Role Routes */}
          <Route path="/creator" element={<ProtectedRoute allowedRoles={['creator']}><CreatorDashboardLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<CreatorDashboard />} />
            <Route path="profile/edit" element={<CreatorProfileEdit />} />
            <Route path="profile/preview" element={<CreatorProfilePreview />} />
            <Route path="products" element={<CreatorProducts />} />
            <Route path="my-reviews" element={<CreatorMyReviews />} />
            <Route path="brands" element={<CreatorBrands />} />
            <Route path="messages" element={<CreatorMessages />} />
            <Route path="standing" element={<CreatorStanding />} />
            <Route path="event/register" element={<CreatorEventRegister />} />
            <Route path="event/night" element={<CreatorEventNight />} />
            <Route path="deals" element={<CreatorDeals />} />
            <Route path="settings" element={<CreatorSettings />} />
          </Route>

          {/* Admin Role Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['manager']}><AdminDashboardLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="brands/*" element={<AdminBrands />} />
            <Route path="creators/*" element={<AdminCreators />} />
            <Route path="products/*" element={<AdminProducts />} />
            <Route path="scoring/*" element={<AdminScoring />} />
            <Route path="cycle/*" element={<AdminCycle />} />
            <Route path="deals" element={<AdminDeals />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Internal Docs Routes */}
          <Route element={<PasswordGate><InternalDocsPortal /></PasswordGate>}>
            <Route path="/internal/docs" element={<InternalDocsPortal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
