'use client';

import { useAuthStore } from '@/store/authStore';
import { EnhancedLoginForm } from '@/components/auth/EnhancedLoginForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { OptimizedPanchtavyaBackground } from '@/components/ui/optimized-backgrounds';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <EnhancedLoginForm />;
  }

  return (
    <div className="relative min-h-screen safe-area-top safe-area-bottom">
      {/* Panchtavya Background for Dashboard */}
      <div className="fixed inset-0 z-0">
        <OptimizedPanchtavyaBackground />
      </div>
      
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen pb-safe">
          {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </main>
        <Footer />
      </div>
    </div>
  );
}
