import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Appointment } from '../types/admin';
import { mockAppointments } from '../data/mock-data';

interface AppointmentState {
  // Estado
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  filters: {
    status: 'all' | Appointment['status'];
    date?: string;
    insurance?: string;
    search?: string;
  };
  isLoading: boolean;
  error: string | null;

  // Acciones
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;

  // Filtros
  setFilters: (filters: Partial<AppointmentState['filters']>) => void;
  clearFilters: () => void;

  // Estados de carga
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones específicas del negocio
  confirmAppointment: (id: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  completeAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  // Selectores computados
  getFilteredAppointments: () => Appointment[];
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByStatus: (status: Appointment['status']) => Appointment[];
  getTodaysAppointments: () => Appointment[];
  getUpcomingAppointments: () => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        appointments: mockAppointments,
        selectedAppointment: null,
        filters: {
          status: 'all'
        },
        isLoading: false,
        error: null,

        // Acciones básicas
        setAppointments: (appointments) =>
          set({ appointments }, false, 'setAppointments'),

        addAppointment: (appointment) =>
          set(
            (state) => ({
              appointments: [...state.appointments, appointment]
            }),
            false,
            'addAppointment'
          ),

        updateAppointment: (id, updates) =>
          set(
            (state) => ({
              appointments: state.appointments.map((appointment) =>
                appointment.id === id ? { ...appointment, ...updates } : appointment
              )
            }),
            false,
            'updateAppointment'
          ),

        deleteAppointment: (id) =>
          set(
            (state) => ({
              appointments: state.appointments.filter((appointment) => appointment.id !== id),
              selectedAppointment: state.selectedAppointment?.id === id ? null : state.selectedAppointment
            }),
            false,
            'deleteAppointment'
          ),

        setSelectedAppointment: (appointment) =>
          set({ selectedAppointment: appointment }, false, 'setSelectedAppointment'),

        // Filtros
        setFilters: (filters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...filters }
            }),
            false,
            'setFilters'
          ),

        clearFilters: () =>
          set(
            {
              filters: { status: 'all' }
            },
            false,
            'clearFilters'
          ),

        // Estados de carga
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        setError: (error) => set({ error }, false, 'setError'),

        // Acciones específicas del negocio
        confirmAppointment: (id) => {
          const { updateAppointment } = get();
          updateAppointment(id, { status: 'confirmed' });
        },

        cancelAppointment: (id, reason) => {
          const { updateAppointment } = get();
          updateAppointment(id, {
            status: 'cancelled',
            notes: reason ? `Cancelada: ${reason}` : 'Cancelada'
          });
        },

        completeAppointment: (id) => {
          const { updateAppointment } = get();
          updateAppointment(id, { status: 'completed' });
        },

        rescheduleAppointment: (id, newDate, newTime) => {
          const { updateAppointment } = get();
          updateAppointment(id, {
            date: newDate,
            time: newTime,
            status: 'confirmed'
          });
        },

        // Selectores computados
        getFilteredAppointments: () => {
          const { appointments, filters } = get();

          return appointments.filter((appointment) => {
            // Filtro por estado
            if (filters.status !== 'all' && appointment.status !== filters.status) {
              return false;
            }

            // Filtro por fecha
            if (filters.date && appointment.date !== filters.date) {
              return false;
            }

            // Filtro por obra social
            if (filters.insurance && appointment.insurance !== filters.insurance) {
              return false;
            }

            // Filtro por búsqueda (nombre del paciente o email)
            if (filters.search) {
              const search = filters.search.toLowerCase();
              const matchesName = appointment.patientName.toLowerCase().includes(search);
              const matchesEmail = appointment.patientEmail.toLowerCase().includes(search);
              if (!matchesName && !matchesEmail) {
                return false;
              }
            }

            return true;
          });
        },

        getAppointmentsByDate: (date) => {
          const { appointments } = get();
          return appointments.filter((appointment) => appointment.date === date);
        },

        getAppointmentsByStatus: (status) => {
          const { appointments } = get();
          return appointments.filter((appointment) => appointment.status === status);
        },

        getTodaysAppointments: () => {
          const { getAppointmentsByDate } = get();
          const today = new Date().toISOString().split('T')[0];
          return getAppointmentsByDate(today);
        },

        getUpcomingAppointments: () => {
          const { appointments } = get();
          const today = new Date().toISOString().split('T')[0];

          return appointments
            .filter((appointment) =>
              appointment.date >= today &&
              (appointment.status === 'confirmed' || appointment.status === 'pending')
            )
            .sort((a, b) => {
              const dateCompare = a.date.localeCompare(b.date);
              if (dateCompare !== 0) return dateCompare;
              return a.time.localeCompare(b.time);
            });
        }
      }),
      {
        name: 'appointment-store',
        // Solo persistir datos importantes, no el estado de loading/error
        partialize: (state) => ({
          appointments: state.appointments,
          filters: state.filters
        })
      }
    ),
    {
      name: 'appointment-store'
    }
  )
);