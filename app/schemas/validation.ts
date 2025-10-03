import { z } from 'zod';
import {
  appointmentDateSchema,
  appointmentTimeSchema,
  insuranceCodeSchema,
  argentinePhoneSchema,
  emailSchema,
  notesSchema,
  nameSchema,
  addressSchema,
  birthDateSchema
} from './utils';

// Esquemas de validación para administración

// Validación para información de contacto de obra social
export const ContactInfoSchema = z.object({
  phone: argentinePhoneSchema,
  email: emailSchema,
  address: addressSchema
});

// Validación para obra social
export const InsuranceSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s&.-]+$/, 'El nombre contiene caracteres inválidos')
    .transform((val) => val.trim()),
  code: insuranceCodeSchema,
  isActive: z.boolean(),
  contactInfo: ContactInfoSchema
});

// Validación para citas médicas
export const AppointmentSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  patientName: nameSchema,
  patientEmail: emailSchema,
  patientPhone: argentinePhoneSchema,
  date: appointmentDateSchema,
  time: appointmentTimeSchema,
  insurance: z.string().min(1, 'La obra social es requerida'),
  status: z.enum(['confirmed', 'pending', 'cancelled', 'completed'], {
    message: 'Estado inválido'
  }),
  notes: notesSchema
});

// Esquema para crear obra social (sin ID)
export const CreateInsuranceSchema = InsuranceSchema.omit({ id: true });

// Esquema para actualizar obra social (ID opcional, otros campos opcionales)
export const UpdateInsuranceSchema = InsuranceSchema.partial().extend({
  id: z.string().min(1, 'ID es requerido')
});

// Esquemas de validación para reservas

// Validación para información del paciente
export const PatientInfoSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: argentinePhoneSchema,
  birthDate: birthDateSchema,
  insurance: z.string().min(1, 'La obra social es requerida'),
  notes: notesSchema
});

// Validación para datos de reserva
export const BookingDataSchema = z.object({
  selectedDate: z.date({
    message: 'La fecha es requerida'
  }).refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    'No se pueden seleccionar fechas pasadas'
  ),
  selectedTime: appointmentTimeSchema,
  patientInfo: PatientInfoSchema,
  currentStep: z.number().min(1).max(4)
});

// Validación para pasos de reserva
export const BookingStepSchema = z.enum(['date', 'time', 'patient', 'confirmation'], {
  message: 'Paso de reserva inválido'
});

// Validaciones para formularios específicos

// Validación para filtros de citas
export const AppointmentFiltersSchema = z.object({
  status: z.enum(['all', 'confirmed', 'pending', 'cancelled', 'completed']).optional(),
  date: appointmentDateSchema.optional(),
  insurance: z.string().optional(),
  search: z.string().max(100, 'La búsqueda no puede tener más de 100 caracteres').optional()
});

// Validación para slots de tiempo disponibles
export const TimeSlotSchema = z.object({
  time: appointmentTimeSchema,
  available: z.boolean()
});

export const TimeSlotsSchema = z.array(TimeSlotSchema);

// Tipos derivados de los esquemas Zod
export type AppointmentInput = z.infer<typeof AppointmentSchema>;
export type CreateInsuranceInput = z.infer<typeof CreateInsuranceSchema>;
export type UpdateInsuranceInput = z.infer<typeof UpdateInsuranceSchema>;
export type PatientInfoInput = z.infer<typeof PatientInfoSchema>;
export type BookingDataInput = z.infer<typeof BookingDataSchema>;
export type AppointmentFiltersInput = z.infer<typeof AppointmentFiltersSchema>;
export type TimeSlotInput = z.infer<typeof TimeSlotSchema>;

// Funciones de utilidad para validación

/**
 * Valida una obra social para creación
 */
export const validateCreateInsurance = (data: unknown) => {
  return CreateInsuranceSchema.safeParse(data);
};

/**
 * Valida una obra social para actualización
 */
export const validateUpdateInsurance = (data: unknown) => {
  return UpdateInsuranceSchema.safeParse(data);
};

/**
 * Valida información del paciente
 */
export const validatePatientInfo = (data: unknown) => {
  return PatientInfoSchema.safeParse(data);
};

/**
 * Valida una cita médica
 */
export const validateAppointment = (data: unknown) => {
  return AppointmentSchema.safeParse(data);
};

/**
 * Valida datos de reserva
 */
export const validateBookingData = (data: unknown) => {
  return BookingDataSchema.safeParse(data);
};

/**
 * Valida filtros de citas
 */
export const validateAppointmentFilters = (data: unknown) => {
  return AppointmentFiltersSchema.safeParse(data);
};

/**
 * Valida que un slot de tiempo esté disponible
 */
export const validateTimeSlot = (data: unknown) => {
  return TimeSlotSchema.safeParse(data);
};

/**
 * Valida múltiples slots de tiempo
 */
export const validateTimeSlots = (data: unknown) => {
  return TimeSlotsSchema.safeParse(data);
};