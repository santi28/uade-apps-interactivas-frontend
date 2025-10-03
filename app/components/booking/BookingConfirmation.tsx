import { useState } from "react";
import type { BookingStepProps } from "../../types/booking";
import { insuranceOptions } from "../../data/booking-data";

export const BookingConfirmation = ({ bookingData, onNext, onBack }: BookingStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    // Simular llamada al backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onNext({});
  };

  const getInsuranceLabel = (value: string) => {
    const insurance = insuranceOptions.find(option => option.value === value);
    return insurance ? insurance.label : value;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Confirmar reserva
            </h2>
            <p className="text-gray-600">
              Revisa los datos de tu cita antes de confirmar
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Editar datos
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Resumen de la cita */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Detalles de la cita
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-700 font-medium">Fecha</p>
              <p className="text-blue-900">
                {bookingData.selectedDate?.toLocaleDateString('es-AR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-blue-700 font-medium">Horario</p>
              <p className="text-blue-900">{bookingData.selectedTime}</p>
            </div>
          </div>
        </div>

        {/* Datos del paciente */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Información del paciente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium">Nombre completo</p>
              <p className="text-gray-900">
                {bookingData.patientInfo?.firstName} {bookingData.patientInfo?.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Email</p>
              <p className="text-gray-900">{bookingData.patientInfo?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Teléfono</p>
              <p className="text-gray-900">{bookingData.patientInfo?.phone}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Obra Social</p>
              <p className="text-gray-900">
                {bookingData.patientInfo?.insurance && getInsuranceLabel(bookingData.patientInfo.insurance)}
              </p>
            </div>
            {bookingData.patientInfo?.notes && (
              <div className="md:col-span-2">
                <p className="text-gray-600 font-medium">Notas adicionales</p>
                <p className="text-gray-900">{bookingData.patientInfo.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Información importante */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Información importante</p>
              <ul className="text-yellow-700 mt-1 space-y-1">
                <li>• Llega 15 minutos antes de tu cita</li>
                <li>• Trae tu DNI y carnet de obra social</li>
                <li>• Si necesitas cancelar, hazlo con al menos 24 horas de anticipación</li>
                <li>• Recibirás un email de confirmación con todos los detalles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botón de confirmación */}
        <div className="flex justify-center pt-4 border-t border-gray-200">
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`
              font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-sm
              ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 hover:shadow-md'
              } text-white
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirmando...
              </div>
            ) : (
              'Confirmar cita médica'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};