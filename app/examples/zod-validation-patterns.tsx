/**
 * Ejemplo de implementación de validaciones Zod en componentes
 * Este archivo muestra diferentes patrones de uso de las validaciones
 */

import { useState } from 'react';
import {
  useFormValidation,
  PatientInfoSchema,
  validateField,
  ContactFormSchema,
  type ContactFormInput
} from '../schemas';

// Ejemplo 1: Formulario de paciente con validación completa
export const ExamplePatientFormWithZod = () => {
  const {
    data,
    errors,
    updateField,
    touchField,
    validateForm,
    getValidatedData,
    isValid,
    hasVisibleErrors
  } = useFormValidation(PatientInfoSchema, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    insurance: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid } = validateForm();
    
    if (isValid) {
      const validatedData = getValidatedData();
      console.log('Datos validados:', validatedData);
      // Aquí enviarías los datos al servidor
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={data.firstName || ''}
          onChange={(e) => updateField('firstName', e.target.value)}
          onBlur={() => touchField('firstName')}
          className={`border p-2 rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={data.email || ''}
          onChange={(e) => updateField('email', e.target.value)}
          onBlur={() => touchField('email')}
          className={`border p-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || hasVisibleErrors}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        Enviar
      </button>
    </form>
  );
};

// Ejemplo 2: Validación de campo individual en tiempo real
export const ExampleRealTimeValidation = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    // Validación en tiempo real
    const { isValid, error } = validateField(
      ContactFormSchema.shape.email,
      value
    );
    
    setEmailError(isValid ? null : error);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email en tiempo real"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        className={`border p-2 rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`}
      />
      {emailError && (
        <p className="text-red-500 text-sm mt-1">{emailError}</p>
      )}
    </div>
  );
};

// Ejemplo 3: Validación condicional
export const ExampleConditionalValidation = () => {
  const [formData, setFormData] = useState<Partial<ContactFormInput>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateConditionally = (field: keyof ContactFormInput, value: string) => {
    // Solo validar si el campo no está vacío o si otros campos relacionados tienen valores
    if (value.trim() === '' && field !== 'email') return;
    
    const { isValid, error } = validateField(
      ContactFormSchema.shape[field],
      value
    );
    
    setErrors(prev => ({
      ...prev,
      [field]: isValid ? '' : error || 'Error de validación'
    }));
  };

  return (
    <form className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Nombre (validación condicional)"
          value={formData.name || ''}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, name: value }));
            validateConditionally('name', value);
          }}
          className={`border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email (requerido)"
          value={formData.email || ''}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, email: value }));
            validateConditionally('email', value);
          }}
          className={`border p-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
    </form>
  );
};

// Ejemplo 4: Validación de formulario complejo con múltiples pasos
export const ExampleMultiStepValidation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {}
  });
  
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        // Validar solo campos del paso 1
        const step1Validation = PatientInfoSchema.pick({
          firstName: true,
          lastName: true,
          email: true
        }).safeParse(formData.step1);
        return step1Validation.success;
        
      case 2:
        // Validar campos del paso 2
        const step2Validation = PatientInfoSchema.pick({
          phone: true,
          birthDate: true
        }).safeParse(formData.step2);
        return step2Validation.success;
        
      case 3:
        // Validar todo el formulario
        const fullValidation = PatientInfoSchema.safeParse({
          ...formData.step1,
          ...formData.step2,
          ...formData.step3
        });
        return fullValidation.success;
        
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log(`Error en el paso ${currentStep}`);
    }
  };

  return (
    <div>
      <h3>Paso {currentStep} de 3</h3>
      
      {/* Renderizar contenido del paso actual */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h4>Información básica</h4>
          {/* Campos del paso 1 */}
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-4">
          <h4>Información de contacto</h4>
          {/* Campos del paso 2 */}
        </div>
      )}
      
      {currentStep === 3 && (
        <div className="space-y-4">
          <h4>Confirmación</h4>
          {/* Resumen de datos */}
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Anterior
          </button>
        )}
        
        {currentStep < 3 ? (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={() => validateStep(3) && console.log('Formulario completado')}
            className="bg-green-500 text-white p-2 rounded"
          >
            Completar
          </button>
        )}
      </div>
    </div>
  );
};

// Resumen de patrones implementados:
/*
1. ✅ Validación completa de formularios con useFormValidation
2. ✅ Validación en tiempo real de campos individuales
3. ✅ Validación condicional basada en estado
4. ✅ Validación por pasos en formularios complejos
5. ✅ Manejo de errores con Zod
6. ✅ Integración con componentes React
7. ✅ Tipos TypeScript derivados de esquemas Zod
8. ✅ Normalización y transformación de datos
9. ✅ Validaciones personalizadas para el contexto argentino
10. ✅ Hooks personalizados para diferentes casos de uso
*/