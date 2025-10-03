import { useState, useEffect } from 'react';
import type { Route } from "./+types/home";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { NavBar } from '../components/NavBar';
import { appointmentService, healthInsuranceService, type Appointment, type HealthInsurance } from '../lib/adminServices';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Dr. Osvaldo Méndez" },
    { name: "description", content: "Panel de administración del consultorio Dr. Osvaldo Méndez" },
  ];
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'insurance'>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showNewInsuranceModal, setShowNewInsuranceModal] = useState(false);
  const [newInsurance, setNewInsurance] = useState({ name: '', code: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAppointments(appointmentService.getAll());
    setHealthInsurances(healthInsuranceService.getAll());
  };

  const handleConfirmAppointment = (id: string) => {
    if (appointmentService.confirmAppointment(id)) {
      loadData();
    }
  };

  const handleCancelAppointment = (id: string) => {
    if (appointmentService.cancelAppointment(id)) {
      loadData();
    }
  };

  const handleCreateInsurance = () => {
    if (newInsurance.name.trim() && newInsurance.code.trim()) {
      healthInsuranceService.create({
        name: newInsurance.name.trim(),
        code: newInsurance.code.trim().toUpperCase(),
        active: true
      });
      setNewInsurance({ name: '', code: '' });
      setShowNewInsuranceModal(false);
      loadData();
    }
  };

  const handleToggleInsurance = (id: string, active: boolean) => {
    healthInsuranceService.update(id, { active });
    loadData();
  };

  const pendingAppointments = appointments.filter(apt => apt.status === 'solicitada');
  const todayAppointments = appointmentService.getTodayAppointments();
  const totalAppointments = appointments.length;
  const activeInsurances = healthInsurances.filter(hi => hi.active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar />

      {/* Tabs Navigation - Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="border-b border-slate-200 mb-6 sm:mb-8">
          <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 sm:py-4 px-3 sm:px-1 border-b-2 sm:border-b-2 border-l-4 sm:border-l-0 font-medium text-sm transition-colors text-left ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 bg-blue-50 sm:bg-transparent'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:hover:bg-transparent'
              }`}
            >
              Resumen General
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-3 sm:py-4 px-3 sm:px-1 border-b-2 sm:border-b-2 border-l-4 sm:border-l-0 font-medium text-sm transition-colors relative text-left ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600 bg-blue-50 sm:bg-transparent'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:hover:bg-transparent'
              }`}
            >
              Gestión de Citas
              {pendingAppointments.length > 0 && (
                <span className="absolute top-2 right-2 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingAppointments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`py-3 sm:py-4 px-3 sm:px-1 border-b-2 sm:border-b-2 border-l-4 sm:border-l-0 font-medium text-sm transition-colors text-left ${
                activeTab === 'insurance'
                  ? 'border-blue-500 text-blue-600 bg-blue-50 sm:bg-transparent'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:hover:bg-transparent'
              }`}
            >
              Obras Sociales
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === 'overview' && (
          <div>
            {/* Quick Stats - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Citas Pendientes</p>
                    <p className="text-xl sm:text-3xl font-bold text-orange-600">{pendingAppointments.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Citas Hoy</p>
                    <p className="text-xl sm:text-3xl font-bold text-blue-600">{todayAppointments.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Total Citas</p>
                    <p className="text-xl sm:text-3xl font-bold text-green-600">{totalAppointments}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 col-span-2 lg:col-span-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Obras Sociales</p>
                    <p className="text-xl sm:text-3xl font-bold text-purple-600">{activeInsurances.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximas Citas - Responsive */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-0 flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
                  Citas Pendientes de Confirmación
                </h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium self-start sm:self-auto"
                >
                  Ver todas →
                </button>
              </div>
              <div className="space-y-3">
                {pendingAppointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg space-y-3 sm:space-y-0 hover:shadow-md transition-shadow">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse mt-1 sm:mt-0 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800 truncate">{appointment.patientName}</p>
                        <p className="text-sm text-slate-600">{appointment.date} - {appointment.time}</p>
                        <p className="text-sm text-slate-500 truncate">{appointment.reason}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleConfirmAppointment(appointment.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto flex-shrink-0"
                    >
                      Confirmar
                    </button>
                  </div>
                ))}
                {pendingAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-slate-600 font-medium">Todas las citas están confirmadas</p>
                    <p className="text-slate-500 text-sm mt-1">No hay citas pendientes de confirmación</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <AppointmentManagement
            appointments={appointments}
            healthInsurances={healthInsurances}
            onConfirm={handleConfirmAppointment}
            onCancel={handleCancelAppointment}
            onRefresh={loadData}
          />
        )}

        {activeTab === 'insurance' && (
          <InsuranceManagement
            healthInsurances={healthInsurances}
            onToggle={handleToggleInsurance}
            onRefresh={loadData}
            showNewModal={showNewInsuranceModal}
            setShowNewModal={setShowNewInsuranceModal}
            newInsurance={newInsurance}
            setNewInsurance={setNewInsurance}
            onCreate={handleCreateInsurance}
          />
        )}
      </main>
    </div>
  );
}

// Componente de gestión de citas
function AppointmentManagement({ 
  appointments, 
  healthInsurances, 
  onConfirm, 
  onCancel, 
  onRefresh 
}: {
  appointments: Appointment[];
  healthInsurances: HealthInsurance[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onRefresh: () => void;
}) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'solicitada' | 'confirmada' | 'cancelada'>('all');
  const [selectedDate, setSelectedDate] = useState('');

  const getInsuranceName = (id: string) => {
    return healthInsurances.find(hi => hi.id === id)?.name || 'N/A';
  };

  const filteredAppointments = appointments.filter(apt => {
    const statusMatch = filterStatus === 'all' || apt.status === filterStatus;
    const dateMatch = !selectedDate || apt.date === selectedDate;
    return statusMatch && dateMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solicitada': return 'bg-amber-100 text-amber-800';
      case 'confirmada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div>
      {/* Filtros - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las citas</option>
                <option value="solicitada">Solicitadas</option>
                <option value="confirmada">Confirmadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={() => {
                setFilterStatus('all');
                setSelectedDate('');
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de citas - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">Citas ({filteredAppointments.length})</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="p-4 sm:p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                      <h4 className="text-base sm:text-lg font-medium text-slate-800">{appointment.patientName}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm text-slate-600">
                      <div className="flex flex-col sm:flex-row sm:gap-6">
                        <div className="mb-2 sm:mb-0">
                          <span className="font-medium text-slate-700">Fecha y Hora:</span><br />
                          <span className="text-slate-600">{appointment.date} - {appointment.time}</span>
                        </div>
                        <div className="mb-2 sm:mb-0">
                          <span className="font-medium text-slate-700">Contacto:</span><br />
                          <a href={`mailto:${appointment.patientEmail}`} className="text-blue-600 hover:underline break-all">{appointment.patientEmail}</a><br />
                          <a href={`tel:${appointment.patientPhone}`} className="text-blue-600 hover:underline">{appointment.patientPhone}</a>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Obra Social:</span><br />
                          <span className="text-slate-600">{getInsuranceName(appointment.healthInsurance)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium text-sm text-slate-700">Motivo de consulta:</span><br />
                      <p className="text-slate-600 break-words">{appointment.reason}</p>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3">
                        <span className="font-medium text-sm text-slate-700">Notas adicionales:</span><br />
                        <p className="text-slate-600 break-words">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
                  {appointment.status === 'solicitada' && (
                    <>
                      <button
                        onClick={() => onConfirm(appointment.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none shadow-sm"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => onCancel(appointment.id)}
                        className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none shadow-sm"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmada' && (
                    <button
                      onClick={() => onCancel(appointment.id)}
                      className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none shadow-sm"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No se encontraron citas con los filtros seleccionados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de gestión de obras sociales
function InsuranceManagement({
  healthInsurances,
  onToggle,
  onRefresh,
  showNewModal,
  setShowNewModal,
  newInsurance,
  setNewInsurance,
  onCreate
}: {
  healthInsurances: HealthInsurance[];
  onToggle: (id: string, active: boolean) => void;
  onRefresh: () => void;
  showNewModal: boolean;
  setShowNewModal: (show: boolean) => void;
  newInsurance: { name: string; code: string };
  setNewInsurance: (insurance: { name: string; code: string }) => void;
  onCreate: () => void;
}) {
  return (
    <div>
      {/* Header con botón agregar - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">Administración de Obras Sociales</h3>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nueva Obra Social</span>
          </button>
        </div>
      </div>

      {/* Lista de obras sociales - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
        <div className="divide-y divide-slate-200">
          {healthInsurances.map((insurance) => (
            <div key={insurance.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <h4 className="text-base sm:text-lg font-medium text-slate-800 truncate">{insurance.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {insurance.code}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        insurance.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {insurance.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Creada el {new Date(insurance.createdAt).toLocaleDateString('es-AR')}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => onToggle(insurance.id, !insurance.active)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto shadow-sm ${
                      insurance.active
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300'
                    }`}
                  >
                    {insurance.active ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {healthInsurances.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No hay obras sociales configuradas
            </div>
          )}
        </div>
      </div>

      {/* Modal para nueva obra social - Responsive */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-4 sm:p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-800">Nueva Obra Social</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={newInsurance.name}
                  onChange={(e) => setNewInsurance({ ...newInsurance, name: e.target.value })}
                  placeholder="Ej: OSDE"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Código</label>
                <input
                  type="text"
                  value={newInsurance.code}
                  onChange={(e) => setNewInsurance({ ...newInsurance, code: e.target.value.toUpperCase() })}
                  placeholder="Ej: OSDE"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={onCreate}
                disabled={!newInsurance.name.trim() || !newInsurance.code.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}