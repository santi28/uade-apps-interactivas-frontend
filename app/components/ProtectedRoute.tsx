import { useEffect } from 'react';
import { useRequireAuth } from '../lib/useAuth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, shouldRedirect } = useRequireAuth();

  useEffect(() => {
    if (shouldRedirect) {
      // En un entorno real con React Router, usarías navigate
      // Por ahora, redirijo con window.location
      window.location.href = redirectTo;
    }
  }, [shouldRedirect, redirectTo]);

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-slate-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar mensaje mientras redirije
  if (shouldRedirect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-slate-600">Acceso no autorizado. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
}