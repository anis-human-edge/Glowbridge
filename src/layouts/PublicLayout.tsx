import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-pearl flex flex-col font-sans selection:bg-moss selection:text-white overflow-x-hidden">
      <Navbar />
      {/* We apply flex-1 to main content to push footer to bottom */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
