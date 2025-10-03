import type { Appointment, Insurance } from "../types/admin";

// Datos simulados de citas neurológicas
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "María González",
    patientEmail: "maria.gonzalez@email.com",
    patientPhone: "+54 11 1234-5678",
    date: "2025-10-01",
    time: "09:30",
    insurance: "OSDE",
    status: "confirmed",
    notes: "Migrañas con aura - Evaluación inicial"
  },
  {
    id: "2",
    patientName: "Carlos Rodríguez",
    patientEmail: "carlos.rodriguez@email.com",
    patientPhone: "+54 11 9876-5432",
    date: "2025-10-01",
    time: "10:00",
    insurance: "Swiss Medical",
    status: "pending",
    notes: "Temblor esencial - Primera consulta"
  },
  {
    id: "3",
    patientName: "Ana Martínez",
    patientEmail: "ana.martinez@email.com",
    patientPhone: "+54 11 5555-1234",
    date: "2025-10-01",
    time: "14:30",
    insurance: "Galeno",
    status: "confirmed",
    notes: "Parkinson - Control de medicación"
  },
  {
    id: "4",
    patientName: "Roberto Silva",
    patientEmail: "roberto.silva@email.com",
    patientPhone: "+54 11 7777-8888",
    date: "2025-10-02",
    time: "09:00",
    insurance: "Particular",
    status: "cancelled",
    notes: "Vértigo - Evaluación pendiente"
  },
  {
    id: "5",
    patientName: "Laura Fernández",
    patientEmail: "laura.fernandez@email.com",
    patientPhone: "+54 11 3333-4444",
    date: "2025-09-29",
    time: "15:30",
    insurance: "OSDE",
    status: "completed",
    notes: "Post-ACV - Rehabilitación neurológica"
  }
];

// Datos simulados de obras sociales
export const mockInsurances: Insurance[] = [
  {
    id: "1",
    name: "OSDE",
    code: "OSDE001",
    isActive: true,
    contactInfo: {
      phone: "+54 11 4321-8765",
      email: "prestadores@osde.com.ar",
      address: "Av. Corrientes 1234, CABA"
    }
  },
  {
    id: "2",
    name: "Swiss Medical",
    code: "SM002",
    isActive: true,
    contactInfo: {
      phone: "+54 11 5678-1234",
      email: "red@swissmedical.com.ar",
      address: "Av. Santa Fe 5678, CABA"
    }
  },
  {
    id: "3",
    name: "Galeno",
    code: "GAL003",
    isActive: true,
    contactInfo: {
      phone: "+54 11 9876-5432",
      email: "prestadores@galeno.com.ar",
      address: "Av. Rivadavia 9876, CABA"
    }
  },
  {
    id: "4",
    name: "Medicus",
    code: "MED004",
    isActive: false,
    contactInfo: {
      phone: "+54 11 1111-2222",
      email: "red@medicus.com.ar",
      address: "Av. Callao 1111, CABA"
    }
  }
];