// Exportaciones principales de validaciones Zod
export * from './validation';
export * from './utils';
export * from './forms';

// Re-exportaciones de utilidades comunes
export { useFormValidation, useFieldValidation, useArrayValidation } from '../hooks/useValidation';

// Funciones de validación más utilizadas
export {
  validateCreateInsurance,
  validateUpdateInsurance,
  validatePatientInfo,
  validateAppointment,
  validateBookingData,
  validateAppointmentFilters
} from './validation';

export {
  validateLoginForm,
  validateContactForm,
  validateUserProfile,
  validateField,
  validatePartial
} from './forms';

// Esquemas principales
export {
  AppointmentSchema,
  InsuranceSchema,
  CreateInsuranceSchema,
  UpdateInsuranceSchema,
  PatientInfoSchema,
  BookingDataSchema,
  ContactInfoSchema
} from './validation';

export {
  LoginFormSchema,
  ContactFormSchema,
  UserProfileSchema,
  NotificationSettingsSchema,
  ScheduleConfigSchema
} from './forms';

// Utilidades de validación
export {
  appointmentDateSchema,
  appointmentTimeSchema,
  argentinePhoneSchema,
  emailSchema,
  nameSchema,
  addressSchema,
  birthDateSchema,
  isWorkingDay,
  isWorkingHour,
  isAppointmentSlotAvailable
} from './utils';

// Tipos
export type {
  AppointmentInput,
  CreateInsuranceInput,
  UpdateInsuranceInput,
  PatientInfoInput,
  BookingDataInput,
  AppointmentFiltersInput,
  TimeSlotInput
} from './validation';

export type {
  LoginFormInput,
  ContactFormInput,
  UserProfileInput,
  NotificationSettingsInput,
  ScheduleConfigInput,
  SearchFormInput
} from './forms';

export type {
  AppointmentDateInput,
  AppointmentTimeInput,
  ArgentinePhoneInput,
  EmailInput,
  NameInput,
  AddressInput,
  BirthDateInput
} from './utils';