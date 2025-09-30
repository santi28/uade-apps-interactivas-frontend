export default function Home() {
  return (
    <>
      <header className="p-4 border-b w-full border-neutral-300 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/">
            <p className="text-2xl font-bold text-gray-800">Dr. Osvaldo</p>
          </a>
          <nav className="flex space-x-4">
            <a href="/admin" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Administración
            </a>
            <a href="/bookings" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Mis citas
            </a>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Turnos
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Reserva tu cita médica de forma rápida y sencilla con Dr. Osvaldo
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="/book"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Reservar Cita Médica
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido y Fácil</h3>
              <p className="text-gray-600">Reserva tu cita en menos de 3 minutos</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmación Inmediata</h3>
              <p className="text-gray-600">Recibe confirmación al instante por email</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión Completa</h3>
              <p className="text-gray-600">Modifica o cancela tus citas cuando necesites</p>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">1</div>
                <p className="font-medium text-gray-900">Selecciona la fecha</p>
                <p className="text-gray-600">Elige el día que te convenga</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">2</div>
                <p className="font-medium text-gray-900">Elige el horario</p>
                <p className="text-gray-600">Ve los horarios disponibles</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">3</div>
                <p className="font-medium text-gray-900">Completa tus datos</p>
                <p className="text-gray-600">Información personal y obra social</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">4</div>
                <p className="font-medium text-gray-900">¡Listo!</p>
                <p className="text-gray-600">Recibe tu confirmación</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}