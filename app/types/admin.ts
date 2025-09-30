// Tipos para las citas médicas
export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  insurance: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes?: string;
}

// Tipos para las obras sociales
export interface Insurance {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

// Tipos para props de componentes
export interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}