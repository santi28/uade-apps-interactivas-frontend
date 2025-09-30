// Estados del flujo de reserva
export type BookingStep = 'date' | 'time' | 'form' | 'confirmation';

// Información de la reserva
export interface BookingData {
  selectedDate?: Date;
  selectedTime?: string;
  patientInfo?: PatientInfo;
}

// Información del paciente
export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  insurance: string;
  notes?: string;
}

// Props para componentes del flujo
export interface BookingStepProps {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack?: () => void;
}

// Lista de obras sociales disponibles
export interface InsuranceOption {
  value: string;
  label: string;
}

// Horarios disponibles por día
export interface TimeSlotAvailability {
  time: string;
  isAvailable: boolean;
  isBooked?: boolean;
}