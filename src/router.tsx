import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage/DashboardPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage/AnalyticsPage'));
const PatientsPage = lazy(() => import('@/pages/PatientsPage/PatientsPage'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)' }}>
      <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );
}

function SuspenseWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <SuspenseWrap>
        <LoginPage />
      </SuspenseWrap>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrap>
            <DashboardPage />
          </SuspenseWrap>
        ),
      },
      {
        path: 'analytics',
        element: (
          <SuspenseWrap>
            <AnalyticsPage />
          </SuspenseWrap>
        ),
      },
      {
        path: 'patients',
        element: (
          <SuspenseWrap>
            <PatientsPage />
          </SuspenseWrap>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
