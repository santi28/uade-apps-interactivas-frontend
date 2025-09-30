// Exportar todos los stores de Zustand
export { useAppointmentStore } from './appointmentStore';
export { useInsuranceStore } from './insuranceStore';
export { useBookingStore } from './bookingStore';

// Re-exportar tipos relacionados con los stores
export type {
  AppointmentInput,
  PatientInfoInput,
  CreateInsuranceInput,
  UpdateInsuranceInput
} from '../schemas/validation';

export type {
  Appointment,
  Insurance
} from '../types/admin';