import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Appointment, Insurance } from '../types/admin';
import type { PatientInfoInput } from '../schemas/validation';
import { validateAppointment, validatePatientInfo } from '../schemas/validation';

interface BookingStep {
  id: string;
  name: string;
  isCompleted: boolean;
  isActive: boolean;
  canNavigate: boolean;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
}

interface BookingState {
  // Estado del flujo de reserva
  currentStep: number;
  steps: BookingStep[];
  isCompleted: boolean;

  // Datos de la reserva
  selectedDate: string | null;
  selectedTime: string | null;
  selectedDoctor: string | null;
  patientInfo: Partial<PatientInfoInput>;
  selectedInsurance: Insurance | null;
  appointmentType: 'consultation' | 'follow-up' | 'emergency' | null;

  // Estados de UI
  isLoading: boolean;
  error: string | null;
  availableSlots: TimeSlot[];
  isSubmitting: boolean;

  // Acciones de navegación
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (stepIndex: number) => void;
  resetBooking: () => void;

  // Acciones de datos
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setSelectedDoctor: (doctorId: string) => void;
  setPatientInfo: (info: Partial<PatientInfoInput>) => void;
  setSelectedInsurance: (insurance: Insurance | null) => void;
  setAppointmentType: (type: 'consultation' | 'follow-up' | 'emergency') => void;

  // Acciones de slots de tiempo
  loadAvailableSlots: (date: string, doctorId: string) => Promise<void>;
  selectTimeSlot: (time: string) => void;

  // Estados de carga
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubmitting: (submitting: boolean) => void;

  // Validación y envío
  validateCurrentStep: () => { isValid: boolean; errors: string[] };
  submitBooking: () => Promise<{ success: boolean; appointmentId?: string; error?: string }>;

  // Selectores computados
  getCurrentStepData: () => BookingStep | null;
  getBookingProgress: () => number;
  isStepValid: (stepIndex: number) => boolean;
  getBookingSummary: () => Partial<Appointment>;
  canProceedToNext: () => boolean;
}

const initialSteps: BookingStep[] = [
  {
    id: 'datetime',
    name: 'Fecha y Hora',
    isCompleted: false,
    isActive: true,
    canNavigate: true
  },
  {
    id: 'patient-info',
    name: 'Información del Paciente',
    isCompleted: false,
    isActive: false,
    canNavigate: false
  },
  {
    id: 'insurance',
    name: 'Obra Social',
    isCompleted: false,
    isActive: false,
    canNavigate: false
  },
  {
    id: 'confirmation',
    name: 'Confirmación',
    isCompleted: false,
    isActive: false,
    canNavigate: false
  }
];

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        currentStep: 0,
        steps: initialSteps,
        isCompleted: false,

        // Datos de reserva
        selectedDate: null,
        selectedTime: null,
        selectedDoctor: null,
        patientInfo: {},
        selectedInsurance: null,
        appointmentType: null,

        // Estados de UI
        isLoading: false,
        error: null,
        availableSlots: [],
        isSubmitting: false,

        // Acciones de navegación
        nextStep: () => {
          const { currentStep, steps, canProceedToNext } = get();

          if (!canProceedToNext()) {
            return;
          }

          const nextStepIndex = Math.min(currentStep + 1, steps.length - 1);

          set(
            (state) => ({
              currentStep: nextStepIndex,
              steps: state.steps.map((step, index) => ({
                ...step,
                isCompleted: index < nextStepIndex,
                isActive: index === nextStepIndex,
                canNavigate: index <= nextStepIndex
              }))
            }),
            false,
            'nextStep'
          );
        },

        previousStep: () => {
          const { currentStep } = get();
          const prevStepIndex = Math.max(currentStep - 1, 0);

          set(
            (state) => ({
              currentStep: prevStepIndex,
              steps: state.steps.map((step, index) => ({
                ...step,
                isActive: index === prevStepIndex
              }))
            }),
            false,
            'previousStep'
          );
        },

        goToStep: (stepIndex) => {
          const { steps } = get();

          if (stepIndex >= 0 && stepIndex < steps.length && steps[stepIndex].canNavigate) {
            set(
              (state) => ({
                currentStep: stepIndex,
                steps: state.steps.map((step, index) => ({
                  ...step,
                  isActive: index === stepIndex
                }))
              }),
              false,
              'goToStep'
            );
          }
        },

        resetBooking: () => {
          set(
            {
              currentStep: 0,
              steps: initialSteps,
              isCompleted: false,
              selectedDate: null,
              selectedTime: null,
              selectedDoctor: null,
              patientInfo: {},
              selectedInsurance: null,
              appointmentType: null,
              isLoading: false,
              error: null,
              availableSlots: [],
              isSubmitting: false
            },
            false,
            'resetBooking'
          );
        },

        // Acciones de datos
        setSelectedDate: (date) => {
          set({ selectedDate: date }, false, 'setSelectedDate');

          // Si hay un doctor seleccionado, cargar slots disponibles
          const { selectedDoctor } = get();
          if (selectedDoctor) {
            get().loadAvailableSlots(date, selectedDoctor);
          }
        },

        setSelectedTime: (time) =>
          set({ selectedTime: time }, false, 'setSelectedTime'),

        setSelectedDoctor: (doctorId) => {
          set({ selectedDoctor: doctorId }, false, 'setSelectedDoctor');

          // Si hay una fecha seleccionada, cargar slots disponibles
          const { selectedDate } = get();
          if (selectedDate) {
            get().loadAvailableSlots(selectedDate, doctorId);
          }
        },

        setPatientInfo: (info) =>
          set(
            (state) => ({
              patientInfo: { ...state.patientInfo, ...info }
            }),
            false,
            'setPatientInfo'
          ),

        setSelectedInsurance: (insurance) =>
          set({ selectedInsurance: insurance }, false, 'setSelectedInsurance'),

        setAppointmentType: (type) =>
          set({ appointmentType: type }, false, 'setAppointmentType'),

        // Acciones de slots de tiempo
        loadAvailableSlots: async (date, doctorId) => {
          const { setLoading, setError } = get();

          setLoading(true);
          setError(null);

          try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 800));

            // Generar slots de ejemplo
            const slots: TimeSlot[] = [
              { time: '09:00', isAvailable: true, isSelected: false },
              { time: '09:30', isAvailable: true, isSelected: false },
              { time: '10:00', isAvailable: false, isSelected: false },
              { time: '10:30', isAvailable: true, isSelected: false },
              { time: '11:00', isAvailable: true, isSelected: false },
              { time: '11:30', isAvailable: false, isSelected: false },
              { time: '14:00', isAvailable: true, isSelected: false },
              { time: '14:30', isAvailable: true, isSelected: false },
              { time: '15:00', isAvailable: true, isSelected: false },
              { time: '15:30', isAvailable: false, isSelected: false },
              { time: '16:00', isAvailable: true, isSelected: false },
              { time: '16:30', isAvailable: true, isSelected: false },
            ];

            set({ availableSlots: slots, isLoading: false }, false, 'loadAvailableSlots');
          } catch (error) {
            setError('Error al cargar horarios disponibles');
            set({ isLoading: false }, false, 'loadAvailableSlots-error');
          }
        },

        selectTimeSlot: (time) => {
          set(
            (state) => ({
              selectedTime: time,
              availableSlots: state.availableSlots.map(slot => ({
                ...slot,
                isSelected: slot.time === time
              }))
            }),
            false,
            'selectTimeSlot'
          );
        },

        // Estados de carga
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        setError: (error) => set({ error }, false, 'setError'),
        setSubmitting: (isSubmitting) => set({ isSubmitting }, false, 'setSubmitting'),

        // Validación y envío
        validateCurrentStep: () => {
          const {
            currentStep,
            selectedDate,
            selectedTime,
            selectedDoctor,
            patientInfo,
            selectedInsurance,
            appointmentType
          } = get();

          const errors: string[] = [];

          switch (currentStep) {
            case 0: // Fecha y hora
              if (!selectedDate) errors.push('Debe seleccionar una fecha');
              if (!selectedTime) errors.push('Debe seleccionar un horario');
              if (!selectedDoctor) errors.push('Debe seleccionar un doctor');
              if (!appointmentType) errors.push('Debe seleccionar el tipo de cita');
              break;

            case 1: // Información del paciente
              const patientValidation = validatePatientInfo(patientInfo);
              if (!patientValidation.success) {
                errors.push(...patientValidation.error.issues.map(issue => issue.message));
              }
              break;

            case 2: // Obra social
              if (!selectedInsurance) {
                errors.push('Debe seleccionar una obra social');
              }
              break;

            case 3: // Confirmación
              // Validar que todos los datos estén completos
              if (!selectedDate || !selectedTime || !selectedDoctor || !appointmentType) {
                errors.push('Faltan datos de la cita');
              }
              const finalPatientValidation = validatePatientInfo(patientInfo);
              if (!finalPatientValidation.success) {
                errors.push('Información del paciente incompleta');
              }
              break;
          }

          return {
            isValid: errors.length === 0,
            errors
          };
        },

        submitBooking: async () => {
          const {
            setSubmitting,
            setError,
            getBookingSummary,
            validateCurrentStep
          } = get();

          // Validar datos finales
          const validation = validateCurrentStep();
          if (!validation.isValid) {
            setError(validation.errors.join(', '));
            return { success: false, error: validation.errors.join(', ') };
          }

          setSubmitting(true);
          setError(null);

          try {
            const bookingData = getBookingSummary();

            // Validar appointment completo
            const appointmentValidation = validateAppointment(bookingData);
            if (!appointmentValidation.success) {
              throw new Error('Datos de cita inválidos');
            }

            // Simular envío a API
            await new Promise(resolve => setTimeout(resolve, 2000));

            const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            set(
              {
                isCompleted: true,
                isSubmitting: false
              },
              false,
              'submitBooking-success'
            );

            return { success: true, appointmentId };
          } catch (error) {
            const errorMessage = 'Error al confirmar la reserva';
            setError(errorMessage);
            setSubmitting(false);
            return { success: false, error: errorMessage };
          }
        },

        // Selectores computados
        getCurrentStepData: () => {
          const { currentStep, steps } = get();
          return steps[currentStep] || null;
        },

        getBookingProgress: () => {
          const { currentStep, steps } = get();
          return ((currentStep + 1) / steps.length) * 100;
        },

        isStepValid: (stepIndex) => {
          const currentStep = get().currentStep;
          const originalStep = currentStep;

          // Temporalmente cambiar al step para validar
          set({ currentStep: stepIndex }, false, 'temp-step-validation');
          const validation = get().validateCurrentStep();
          set({ currentStep: originalStep }, false, 'restore-step-validation');

          return validation.isValid;
        },

        getBookingSummary: () => {
          const {
            selectedDate,
            selectedTime,
            selectedDoctor,
            patientInfo,
            selectedInsurance,
            appointmentType
          } = get();

          return {
            date: selectedDate || '',
            time: selectedTime || '',
            doctorId: selectedDoctor || '',
            patientInfo: patientInfo as PatientInfoInput,
            insuranceId: selectedInsurance?.id || '',
            type: appointmentType || 'consultation',
            status: 'pending' as const,
            notes: ''
          };
        },

        canProceedToNext: () => {
          const { validateCurrentStep, currentStep, steps } = get();
          const validation = validateCurrentStep();
          return validation.isValid && currentStep < steps.length - 1;
        }
      }),
      {
        name: 'booking-store',
        // Solo persistir el progreso actual, no los datos sensibles
        partialize: (state) => ({
          currentStep: state.currentStep,
          selectedDate: state.selectedDate,
          selectedTime: state.selectedTime,
          appointmentType: state.appointmentType
        })
      }
    ),
    {
      name: 'booking-store'
    }
  )
);