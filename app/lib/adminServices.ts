// Tipos para la gestión de citas y obras sociales
export interface HealthInsurance {
  id: string;
  name: string;
  code: string;
  active: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  healthInsurance: string; // ID de la obra social
  status: 'solicitada' | 'confirmada' | 'cancelada';
  notes?: string;
  createdAt: string;
}

// Datos simulados de obras sociales
const MOCK_HEALTH_INSURANCES: HealthInsurance[] = [
  {
    id: '1',
    name: 'OSDE',
    code: 'OSDE',
    active: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Swiss Medical',
    code: 'SWISS',
    active: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Galeno',
    code: 'GALENO',
    active: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Medicus',
    code: 'MEDICUS',
    active: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Particular',
    code: 'PARTICULAR',
    active: true,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// Datos simulados de citas neurológicas
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Ana García',
    patientEmail: 'ana.garcia@email.com',
    patientPhone: '+54 11 1234-5678',
    date: '2025-10-03',
    time: '09:00',
    reason: 'Cefaleas recurrentes - Evaluación inicial',
    healthInsurance: '1', // OSDE
    status: 'solicitada',
    createdAt: '2025-10-02T10:00:00Z'
  },
  {
    id: '2',
    patientName: 'Carlos López',
    patientEmail: 'carlos.lopez@email.com',
    patientPhone: '+54 11 2345-6789',
    date: '2025-10-03',
    time: '10:30',
    reason: 'Control de epilepsia - Ajuste de medicación',
    healthInsurance: '2', // Swiss Medical
    status: 'confirmada',
    createdAt: '2025-10-02T11:00:00Z'
  },
  {
    id: '3',
    patientName: 'María Rodríguez',
    patientEmail: 'maria.rodriguez@email.com',
    patientPhone: '+54 11 3456-7890',
    date: '2025-10-03',
    time: '14:00',
    reason: 'Trastornos de memoria - Primera consulta',
    healthInsurance: '3', // Galeno
    status: 'solicitada',
    createdAt: '2025-10-02T12:00:00Z'
  },
  {
    id: '4',
    patientName: 'Juan Pérez',
    patientEmail: 'juan.perez@email.com',
    patientPhone: '+54 11 4567-8901',
    date: '2025-10-04',
    time: '09:30',
    reason: 'Neuropatía periférica - Seguimiento',
    healthInsurance: '4', // Medicus
    status: 'solicitada',
    createdAt: '2025-10-02T14:00:00Z'
  },
  {
    id: '5',
    patientName: 'Laura Martinez',
    patientEmail: 'laura.martinez@email.com',
    patientPhone: '+54 11 5678-9012',
    date: '2025-10-04',
    time: '11:00',
    reason: 'Esclerosis múltiple - Control mensual',
    healthInsurance: '5', // Particular
    status: 'confirmada',
    createdAt: '2025-10-02T15:00:00Z'
  },
  {
    id: '6',
    patientName: 'Roberto Fernández',
    patientEmail: 'roberto.fernandez@email.com',
    patientPhone: '+54 11 6789-0123',
    date: '2025-10-05',
    time: '10:00',
    reason: 'Síndrome del túnel carpiano - Evaluación EMG',
    healthInsurance: '1', // OSDE
    status: 'solicitada',
    createdAt: '2025-10-03T09:00:00Z'
  },
  {
    id: '7',
    patientName: 'Patricia Morales',
    patientEmail: 'patricia.morales@email.com',
    patientPhone: '+54 11 7890-1234',
    date: '2025-10-05',
    time: '15:30',
    reason: 'Alzheimer incipiente - Seguimiento cognitivo',
    healthInsurance: '2', // Swiss Medical
    status: 'confirmada',
    createdAt: '2025-10-03T11:30:00Z'
  }
];

// Utilidades para localStorage (simula base de datos)
const STORAGE_KEYS = {
  appointments: 'dr_osvaldo_appointments',
  healthInsurances: 'dr_osvaldo_health_insurances'
};

function getFromStorage<T>(key: string, defaultValue: T[]): T[] {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Servicios para gestión de citas
export const appointmentService = {
  // Obtener todas las citas
  getAll(): Appointment[] {
    return getFromStorage(STORAGE_KEYS.appointments, MOCK_APPOINTMENTS);
  },

  // Obtener citas por estado
  getByStatus(status: Appointment['status']): Appointment[] {
    return this.getAll().filter(apt => apt.status === status);
  },

  // Obtener citas de hoy
  getTodayAppointments(): Appointment[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getAll().filter(apt => apt.date === today);
  },

  // Confirmar una cita
  confirmAppointment(id: string): boolean {
    const appointments = this.getAll();
    const index = appointments.findIndex(apt => apt.id === id);

    if (index !== -1 && appointments[index].status === 'solicitada') {
      appointments[index].status = 'confirmada';
      saveToStorage(STORAGE_KEYS.appointments, appointments);
      return true;
    }
    return false;
  },

  // Cancelar una cita
  cancelAppointment(id: string): boolean {
    const appointments = this.getAll();
    const index = appointments.findIndex(apt => apt.id === id);

    if (index !== -1) {
      appointments[index].status = 'cancelada';
      saveToStorage(STORAGE_KEYS.appointments, appointments);
      return true;
    }
    return false;
  },

  // Agregar notas a una cita
  addNotes(id: string, notes: string): boolean {
    const appointments = this.getAll();
    const index = appointments.findIndex(apt => apt.id === id);

    if (index !== -1) {
      appointments[index].notes = notes;
      saveToStorage(STORAGE_KEYS.appointments, appointments);
      return true;
    }
    return false;
  }
};

// Servicios para gestión de obras sociales
export const healthInsuranceService = {
  // Obtener todas las obras sociales
  getAll(): HealthInsurance[] {
    return getFromStorage(STORAGE_KEYS.healthInsurances, MOCK_HEALTH_INSURANCES);
  },

  // Obtener obras sociales activas
  getActive(): HealthInsurance[] {
    return this.getAll().filter(hi => hi.active);
  },

  // Crear nueva obra social
  create(data: Omit<HealthInsurance, 'id' | 'createdAt'>): HealthInsurance {
    const healthInsurances = this.getAll();
    const newHealthInsurance: HealthInsurance = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    healthInsurances.push(newHealthInsurance);
    saveToStorage(STORAGE_KEYS.healthInsurances, healthInsurances);
    return newHealthInsurance;
  },

  // Actualizar obra social
  update(id: string, data: Partial<Omit<HealthInsurance, 'id' | 'createdAt'>>): boolean {
    const healthInsurances = this.getAll();
    const index = healthInsurances.findIndex(hi => hi.id === id);

    if (index !== -1) {
      healthInsurances[index] = { ...healthInsurances[index], ...data };
      saveToStorage(STORAGE_KEYS.healthInsurances, healthInsurances);
      return true;
    }
    return false;
  },

  // Eliminar obra social (desactivar)
  delete(id: string): boolean {
    return this.update(id, { active: false });
  },

  // Obtener obra social por ID
  getById(id: string): HealthInsurance | null {
    return this.getAll().find(hi => hi.id === id) || null;
  }
};