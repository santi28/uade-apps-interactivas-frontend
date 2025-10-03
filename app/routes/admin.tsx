import type { Route } from "./+types/admin";
import { useState } from "react";
import { TabButton } from "../components/admin/TabButton";
import { AppointmentsTab } from "../pages/admin/AppointmentsTab";
import { InsurancesTab } from "../pages/admin/InsurancesTab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Administración - Dr. Osvaldo" },
    { name: "description", content: "Panel de administración del sistema de turnos" },
  ];
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'insurances'>('appointments');

  return (
    <>
      <header className="p-4 border-b w-full border-neutral-300 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/">
            <p className="text-2xl font-bold text-gray-800">Dr. Osvaldo - Admin</p>
          </a>
          <nav className="flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Ir al sitio principal
            </a>
            <a href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Cerrar sesión
            </a>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Gestiona las citas médicas y obras sociales
            </p>
          </header>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <TabButton
                active={activeTab === 'appointments'}
                onClick={() => setActiveTab('appointments')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                }
              >
                Citas Médicas
              </TabButton>
              
              <TabButton
                active={activeTab === 'insurances'}
                onClick={() => setActiveTab('insurances')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                }
              >
                Obras Sociales
              </TabButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === 'appointments' ? <AppointmentsTab /> : <InsurancesTab />}
          </div>
        </div>
      </main>
    </>
  );
}