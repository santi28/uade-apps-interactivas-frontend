import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dr. Osvaldo - Sistema de Citas" },
    { name: "description", content: "Página de inicio del sistema de turnos" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Lado izquierdo - Imagen del Dr. Osvaldo */}
      <div className="relative w-full lg:w-1/2 h-72 sm:h-80 lg:h-screen lg:sticky lg:top-0 order-2 lg:order-1">
        <img
          src="/osvaldo.png"
          alt="Dr. Osvaldo Méndez - Especialista en Medicina Interna"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay médico profesional */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-transparent"></div>
        
        {/* Badge de certificación médico */}
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Disponible</span>
            </div>
          </div>
        </div>

        {/* Credenciales médicas */}
        <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-100 max-w-xs">
            <div className="text-sm">
              <p className="font-semibold text-slate-800">Dr. Osvaldo Méndez</p>
              <p className="text-slate-600">Mat. Nacional: 12345</p>
              <p className="text-slate-600">Medicina Interna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Panel de información médica */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 lg:min-h-screen lg:overflow-y-auto flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-1 lg:order-2">
        <div className="max-w-2xl w-full">
          {/* Encabezado médico profesional */}
          <div className="text-center lg:text-left mb-8 lg:mb-12">
            {/* Badge de medicina */}
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2zm-2-4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1z" clipRule="evenodd" />
              </svg>
              Medicina Especializada
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 lg:mb-4 text-slate-800 leading-tight">
              Dr. Osvaldo Méndez
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-2">
              Especialista en Medicina Interna
            </p>
            <p className="text-sm sm:text-base text-slate-500">
              Sistema de Gestión de Citas Médicas
            </p>
          </div>

          {/* Información profesional */}
          <div className="mb-8 lg:mb-12">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-200 mb-6">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                <span className="font-semibold text-slate-800">15+ años de experiencia</span> brindando 
                atención médica integral y personalizada. Comprometido con la excelencia en el cuidado 
                de la salud de mis pacientes.
              </p>
              
              {/* Certificaciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Certificado por el Colegio Médico
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Miembro de la Sociedad de Medicina Interna
                </div>
              </div>
            </div>
            
            {/* Servicios médicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200/50">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-lg p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Turnos Online</h3>
                    <p className="text-sm text-slate-600">Reserva disponible 24/7</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-5 border border-green-200/50">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 rounded-lg p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Atención Integral</h3>
                    <p className="text-sm text-slate-600">Consultas médicas completas</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-5 border border-purple-200/50 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 rounded-lg p-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Historial Digital Seguro</h3>
                    <p className="text-sm text-slate-600">Acceso completo a tu información médica protegida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción profesionales */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-12">
            <a
              href="/login"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-center border border-blue-700"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Acceder al Portal
              </span>
            </a>
            
            <a
              href="/bookings"
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-xl border-2 border-slate-300 hover:border-blue-400 transition-all duration-300 transform hover:scale-[1.02] text-center"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ver Disponibilidad
              </span>
            </a>
          </div>

          {/* Información de contacto profesional */}
          <div className="bg-slate-800 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contacto@droscaldo.com.ar
                </div>
                <div className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +54 11 4567-8900
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Av. Corrientes 1234, CABA
                </div>
                <div className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Lun - Vie: 9:00 - 18:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
