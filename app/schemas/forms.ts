import { z } from 'zod';
import {
  appointmentDateSchema,
  appointmentTimeSchema,
  emailSchema,
  argentinePhoneSchema,
  nameSchema
} from './utils';

/**
 * Validaciones específicas para formularios de componentes React
 * Incluye validaciones en tiempo real y validaciones de eventos
 */

// Esquema para validación de login
export const LoginFormSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'La contraseña debe contener al menos: una minúscula, una mayúscula, un número y un carácter especial'),
  rememberMe: z.boolean().optional()
});

// Esquema para validación de cambio de contraseña
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string()
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'La contraseña debe contener al menos: una minúscula, una mayúscula, un número y un carácter especial'),
  confirmPassword: z.string()
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword']
  }
);

// Esquema para validación de búsqueda en tiempo real
export const SearchFormSchema = z.object({
  query: z.string()
    .max(100, 'La búsqueda no puede tener más de 100 caracteres')
    .optional()
    .transform(val => val?.trim() || ''),
  filter: z.enum(['all', 'patients', 'appointments', 'insurances']).default('all'),
  sortBy: z.enum(['date', 'name', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Esquema para validación de configuración de horarios
export const ScheduleConfigSchema = z.object({
  workingDays: z.array(z.number().min(0).max(6)).min(1, 'Debe seleccionar al menos un día'),
  startTime: appointmentTimeSchema,
  endTime: appointmentTimeSchema,
  slotDuration: z.number()
    .min(15, 'La duración mínima es 15 minutos')
    .max(120, 'La duración máxima es 120 minutos')
    .refine(val => val % 15 === 0, 'La duración debe ser múltiplo de 15 minutos'),
  breakStart: appointmentTimeSchema.optional(),
  breakEnd: appointmentTimeSchema.optional()
}).refine(
  (data) => {
    const start = parseInt(data.startTime.split(':')[0]) * 60 + parseInt(data.startTime.split(':')[1]);
    const end = parseInt(data.endTime.split(':')[0]) * 60 + parseInt(data.endTime.split(':')[1]);
    return start < end;
  },
  {
    message: 'La hora de fin debe ser posterior a la hora de inicio',
    path: ['endTime']
  }
).refine(
  (data) => {
    if (!data.breakStart || !data.breakEnd) return true;
    const breakStart = parseInt(data.breakStart.split(':')[0]) * 60 + parseInt(data.breakStart.split(':')[1]);
    const breakEnd = parseInt(data.breakEnd.split(':')[0]) * 60 + parseInt(data.breakEnd.split(':')[1]);
    return breakStart < breakEnd;
  },
  {
    message: 'La hora de fin del descanso debe ser posterior a la hora de inicio',
    path: ['breakEnd']
  }
);

// Esquema para validación de contacto/consulta
export const ContactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: argentinePhoneSchema.optional(),
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede tener más de 100 caracteres'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede tener más de 1000 caracteres'),
  preferredContactMethod: z.enum(['email', 'phone']).default('email'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium')
});

// Esquema para validación de configuración de notificaciones
export const NotificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  appointmentReminders: z.boolean().default(true),
  reminderTime: z.enum(['15', '30', '60', '120', '1440']).default('60'), // minutos
  marketingEmails: z.boolean().default(false),
  systemUpdates: z.boolean().default(true)
});

// Esquema para validación de perfil de usuario
export const UserProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: argentinePhoneSchema,
  birthDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido')
    .refine(
      (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        return birthDate <= today;
      },
      'La fecha de nacimiento no puede ser futura'
    ),
  address: z.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede tener más de 200 caracteres'),
  emergencyContact: z.object({
    name: nameSchema,
    relationship: z.string().min(2, 'La relación es requerida'),
    phone: argentinePhoneSchema
  }),
  medicalInfo: z.object({
    allergies: z.string().max(500, 'Las alergias no pueden tener más de 500 caracteres').optional(),
    medications: z.string().max(500, 'Los medicamentos no pueden tener más de 500 caracteres').optional(),
    conditions: z.string().max(500, 'Las condiciones no pueden tener más de 500 caracteres').optional()
  }).optional()
});

// Esquema para validación de cancelación de cita
export const CancelAppointmentSchema = z.object({
  appointmentId: z.string().min(1, 'ID de cita requerido'),
  reason: z.enum([
    'personal',
    'medical',
    'work',
    'emergency',
    'other'
  ]),
  customReason: z.string()
    .max(200, 'La razón no puede tener más de 200 caracteres')
    .optional(),
  refundRequested: z.boolean().default(false)
}).refine(
  (data) => {
    if (data.reason === 'other') {
      return data.customReason && data.customReason.trim().length >= 5;
    }
    return true;
  },
  {
    message: 'Debe especificar la razón cuando selecciona "Otro"',
    path: ['customReason']
  }
);

// Tipos derivados
export type LoginFormInput = z.infer<typeof LoginFormSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type SearchFormInput = z.infer<typeof SearchFormSchema>;
export type ScheduleConfigInput = z.infer<typeof ScheduleConfigSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type NotificationSettingsInput = z.infer<typeof NotificationSettingsSchema>;
export type UserProfileInput = z.infer<typeof UserProfileSchema>;
export type CancelAppointmentInput = z.infer<typeof CancelAppointmentSchema>;

// Funciones de validación

export const validateLoginForm = (data: unknown) => LoginFormSchema.safeParse(data);
export const validateChangePassword = (data: unknown) => ChangePasswordSchema.safeParse(data);
export const validateSearchForm = (data: unknown) => SearchFormSchema.safeParse(data);
export const validateScheduleConfig = (data: unknown) => ScheduleConfigSchema.safeParse(data);
export const validateContactForm = (data: unknown) => ContactFormSchema.safeParse(data);
export const validateNotificationSettings = (data: unknown) => NotificationSettingsSchema.safeParse(data);
export const validateUserProfile = (data: unknown) => UserProfileSchema.safeParse(data);
export const validateCancelAppointment = (data: unknown) => CancelAppointmentSchema.safeParse(data);

/**
 * Utilidad para validar campos individuales en tiempo real
 */
export const validateField = (schema: z.ZodSchema, value: unknown) => {
  const result = schema.safeParse(value);
  return {
    isValid: result.success,
    error: result.success ? null : result.error.issues[0]?.message || 'Valor inválido'
  };
};

/**
 * Utilidad para validar formularios parciales (campos opcionales durante la escritura)
 */
export const validatePartial = <T extends z.ZodObject<any>>(
  schema: T,
  data: unknown,
  requiredFields?: string[]
) => {
  const partialSchema = schema.partial();
  const result = partialSchema.safeParse(data);

  if (!result.success) {
    return result;
  }

  // Validar campos requeridos si se especifican
  if (requiredFields) {
    const errors: string[] = [];
    const dataObj = data as Record<string, unknown>;

    requiredFields.forEach(field => {
      if (!dataObj[field] || (typeof dataObj[field] === 'string' && !dataObj[field].toString().trim())) {
        errors.push(`${field} es requerido`);
      }
    });

    if (errors.length > 0) {
      return {
        success: false,
        error: {
          issues: errors.map(message => ({ message, path: [] }))
        }
      } as const;
    }
  }

  return result;
};