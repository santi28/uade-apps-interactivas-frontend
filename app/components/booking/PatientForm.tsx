import { useState } from "react";
import type { BookingStepProps, PatientInfo } from "../../types/booking";
import { insuranceOptions } from "../../data/booking-data";
import { PatientInfoSchema } from "../../schemas/validation";

interface InputFieldProps {
  label: string;
  field: keyof PatientInfo;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (field: keyof PatientInfo, value: string) => void;
  error?: string;
}

const InputField = ({ 
  label, 
  field, 
  type = "text", 
  placeholder, 
  required = true,
  value,
  onChange,
  error
}: InputFieldProps) => (
  <div>
    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={field}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

export const PatientForm = ({ bookingData, onNext, onBack }: BookingStepProps) => {
  const [formData, setFormData] = useState<PatientInfo>(
    bookingData.patientInfo || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      insurance: "",
      notes: ""
    }
  );

  const [errors, setErrors] = useState<Partial<PatientInfo>>({});

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const validation = PatientInfoSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors: Partial<PatientInfo> = {};
      
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PatientInfo;
        if (field) {
          newErrors[field] = issue.message;
        }
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ patientInfo: formData });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Información del paciente
            </h2>
            <p className="text-gray-600">
              Cita para el {bookingData.selectedDate?.toLocaleDateString('es-AR')} a las {bookingData.selectedTime}
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Cambiar horario
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            field="firstName"
            placeholder="Ingresa tu nombre"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          
          <InputField
            label="Apellido"
            field="lastName"
            placeholder="Ingresa tu apellido"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            error={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Email"
            field="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email || ""}
            onChange={handleInputChange}
            error={errors.email}
          />
          
          <InputField
            label="Teléfono"
            field="phone"
            type="tel"
            placeholder="+54 9 11 1234-5678"
            value={formData.phone || ""}
            onChange={handleInputChange}
            error={errors.phone}
          />
        </div>

        <InputField
          label="Fecha de Nacimiento"
          field="birthDate"
          type="date"
          placeholder=""
          value={formData.birthDate || ""}
          onChange={handleInputChange}
          error={errors.birthDate}
        />

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-2">
            Obra Social <span className="text-red-500">*</span>
          </label>
          <select
            id="insurance"
            value={formData.insurance || ""}
            onChange={(e) => handleInputChange("insurance", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.insurance 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            }`}
          >
            <option value="">Selecciona una obra social</option>
            {insuranceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.insurance && (
            <p className="mt-1 text-sm text-red-600">{errors.insurance}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones adicionales
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes || ""}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Información adicional que consideres importante..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 resize-none"
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirmar datos →
          </button>
        </div>
      </form>
    </div>
  );
};