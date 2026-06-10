import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { AppRoutes } from '@/router';
import { fetchMe, sessionExpired } from '@/features/auth/authSlice';
import { storage } from '@/utils/storage';
import SocialSidebar from '@/components/layout/SocialSidebar';
export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Restore session on first load
  useEffect(() => {
    if (storage.get('accessToken')) dispatch(fetchMe());
  }, [dispatch]);

  // React to the auth:expired event from the axios interceptor
  useEffect(() => {
    const onExpired = () => dispatch(sessionExpired());
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  const hideChrome = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!hideChrome && <AnnouncementBar />}
      {!hideChrome && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <MobileBottomNav />}
      {!hideChrome && <SocialSidebar />}
      {!hideChrome && <WhatsAppButton />}
      <Toaster position="bottom-center" toastOptions={{
        style: { background: '#1F1A17', color: '#FBF7F1', borderRadius: 0 },
      }} />
    </div>
  );
}
