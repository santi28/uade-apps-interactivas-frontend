import { z } from 'zod';

/**
 * Utilidades de validación para fechas y horarios del sistema de citas
 */

// Validación para fechas de cita
export const appointmentDateSchema = z.string()
  .min(1, 'La fecha es requerida')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
  .refine(
    (date) => {
      const appointmentDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return appointmentDate >= today;
    },
    'No se pueden agendar citas en fechas pasadas'
  )
  .refine(
    (date) => {
      const appointmentDate = new Date(date);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 6); // Máximo 6 meses adelante
      return appointmentDate <= maxDate;
    },
    'No se pueden agendar citas con más de 6 meses de anticipación'
  );

// Validación para horarios de cita
export const appointmentTimeSchema = z.string()
  .min(1, 'La hora es requerida')
  .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
  .refine(
    (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const startTime = 8 * 60; // 8:00 AM
      const endTime = 18 * 60;   // 6:00 PM
      return totalMinutes >= startTime && totalMinutes <= endTime;
    },
    'Los horarios de atención son de 8:00 a 18:00'
  )
  .refine(
    (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return minutes % 30 === 0; // Solo intervalos de 30 minutos
    },
    'Los horarios deben ser en intervalos de 30 minutos (ej: 9:00, 9:30)'
  );

// Validación para códigos de obra social
export const insuranceCodeSchema = z.string()
  .min(2, 'El código debe tener al menos 2 caracteres')
  .max(10, 'El código no puede tener más de 10 caracteres')
  .regex(/^[A-Z0-9]+$/, 'El código debe estar en mayúsculas y solo contener letras y números')
  .transform((val) => val.toUpperCase()); // Normalizar a mayúsculas

// Validación para teléfonos argentinos
export const argentinePhoneSchema = z.string()
  .min(8, 'El teléfono debe tener al menos 8 dígitos')
  .max(20, 'El teléfono no puede tener más de 20 dígitos')
  .regex(/^[+]?[\d\s\-\(\)]+$/, 'El teléfono contiene caracteres inválidos')
  .refine(
    (phone) => {
      // Remover espacios, guiones, paréntesis para validar solo números
      const cleanPhone = phone.replace(/[\s\-\(\)+]/g, '');
      return cleanPhone.length >= 8 && cleanPhone.length <= 15;
    },
    'Formato de teléfono inválido'
  )
  .refine(
    (phone) => {
      const cleanPhone = phone.replace(/[\s\-\(\)+]/g, '');
      // Validar que empiece con código de país (54) o código de área argentino
      return /^(54|11|221|351|261|381|341|342|223|2966|2944|299|2983|2972|2901)/.test(cleanPhone) ||
        cleanPhone.length === 8; // Número local sin código de área
    },
    'El teléfono debe tener un código de área válido argentino'
  );

// Validación para emails con dominios comunes
export const emailSchema = z.string()
  .email('Formato de email inválido')
  .min(1, 'El email es requerido')
  .max(100, 'El email no puede tener más de 100 caracteres')
  .refine(
    (email) => {
      // Lista de dominios comunes aceptados
      const validDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'yahoo.com.ar', 'hotmail.com.ar', 'live.com', 'icloud.com',
        'protonmail.com', 'tutanota.com'
      ];
      const domain = email.split('@')[1]?.toLowerCase();
      return !domain || validDomains.includes(domain) || domain.includes('.edu.ar') || domain.includes('.gov.ar');
    },
    'Dominio de email no válido'
  );

// Validación para notas y observaciones
export const notesSchema = z.string()
  .max(500, 'Las notas no pueden tener más de 500 caracteres')
  .optional()
  .transform((val) => val?.trim() || undefined);

// Validación para nombres y apellidos
export const nameSchema = z.string()
  .min(2, 'Debe tener al menos 2 caracteres')
  .max(50, 'No puede tener más de 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo puede contener letras y espacios')
  .transform((val) => {
    // Normalizar: primera letra mayúscula, resto minúscula
    return val.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  });

// Validación para direcciones
export const addressSchema = z.string()
  .min(5, 'La dirección debe tener al menos 5 caracteres')
  .max(200, 'La dirección no puede tener más de 200 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/, 'La dirección contiene caracteres inválidos');

// Esquema para validar edad mínima y máxima
export const birthDateSchema = z.string()
  .min(1, 'La fecha de nacimiento es requerida')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    },
    'La fecha de nacimiento no puede ser futura'
  )
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 0 && age <= 120;
    },
    'Edad inválida'
  )
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 16; // Edad mínima para agendar citas
    },
    'Debe ser mayor de 16 años para agendar una cita'
  );

/**
 * Funciones de utilidad para validar rangos de fechas
 */
export const isWorkingDay = (date: Date): boolean => {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Lunes a Viernes
};

export const isWorkingHour = (time: string): boolean => {
  const [hours] = time.split(':').map(Number);
  return hours >= 8 && hours < 18;
};

/**
 * Validar si una fecha/hora específica está disponible
 */
export const isAppointmentSlotAvailable = (date: string, time: string): boolean => {
  const appointmentDate = new Date(date);

  // Verificar que sea día laboral
  if (!isWorkingDay(appointmentDate)) {
    return false;
  }

  // Verificar horario laboral
  if (!isWorkingHour(time)) {
    return false;
  }

  // Aquí se podría agregar lógica adicional para verificar
  // slots ya ocupados consultando una base de datos

  return true;
};

export type AppointmentDateInput = z.infer<typeof appointmentDateSchema>;
export type AppointmentTimeInput = z.infer<typeof appointmentTimeSchema>;
export type InsuranceCodeInput = z.infer<typeof insuranceCodeSchema>;
export type ArgentinePhoneInput = z.infer<typeof argentinePhoneSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type NotesInput = z.infer<typeof notesSchema>;
export type NameInput = z.infer<typeof nameSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type BirthDateInput = z.infer<typeof birthDateSchema>;