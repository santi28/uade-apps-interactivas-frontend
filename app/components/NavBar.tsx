import { useAuth } from '../lib/useAuth';

interface NavBarProps {
  title?: string;
}

export function NavBar({ title = "Panel de Administración" }: NavBarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1 lg:flex-none">
            <a href="/dashboard" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800 truncate">Dr. Osvaldo Méndez</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center">
            <span className="text-sm text-slate-500 font-medium">Panel Administrativo</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <a
              href="/"
              className="hidden sm:flex items-center space-x-2 text-slate-500 hover:text-slate-700 px-2 py-1.5 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Volver al sitio</span>
            </a>
            <div className="hidden md:flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-xs sm:text-sm min-w-0">
                <div className="font-medium text-slate-800 truncate">{user?.name}</div>
                <div className="text-slate-500 truncate">Administrador</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2 flex-shrink-0"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 14 14">
                <path fillRule="evenodd" d="M2.23 1.358a.4.4 0 0 1 .27-.109h7c.103 0 .2.04.27.109a.35.35 0 0 1 .105.247v.962a.625.625 0 1 0 1.25 0v-.962c0-.43-.174-.84-.48-1.14A1.64 1.64 0 0 0 9.5 0h-7c-.427 0-.84.167-1.145.466s-.48.71-.48 1.14v10.79c0 .43.174.839.48 1.14c.306.299.718.465 1.145.465h7c.427 0 .84-.166 1.145-.466s.48-.71.48-1.14v-.961a.625.625 0 1 0-1.25 0v.962c0 .09-.037.18-.106.247a.4.4 0 0 1-.269.108h-7c-.103 0-.2-.04-.27-.108a.35.35 0 0 1-.105-.247V1.605c0-.09.037-.18.106-.247m8.03 3.065A.63.63 0 0 0 9.876 5v1.375H5.5a.625.625 0 1 0 0 1.25h4.375V9a.625.625 0 0 0 1.067.442l2-2a.625.625 0 0 0 0-.884l-2-2a.625.625 0 0 0-.681-.135" clipRule="evenodd"/>
              </svg>
              <span className="hidden sm:block">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}