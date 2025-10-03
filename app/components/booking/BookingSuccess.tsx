import type { BookingData } from "../../types/booking";
import { insuranceOptions } from "../../data/booking-data";

interface BookingSuccessProps {
  bookingData: BookingData;
}

export const BookingSuccess = ({ bookingData }: BookingSuccessProps) => {
  const getInsuranceLabel = (value: string) => {
    const insurance = insuranceOptions.find(option => option.value === value);
    return insurance ? insurance.label : value;
  };

  const bookingId = `DR-${Date.now().toString().slice(-6)}`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header de éxito */}
        <div className="bg-green-50 px-6 py-8 text-center border-b border-green-200">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            ¡Cita confirmada exitosamente!
          </h2>
          <p className="text-green-700">
            Tu cita ha sido reservada. Recibirás un email de confirmación en breve.
          </p>
        </div>

        {/* Detalles de la cita */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Número de reserva</p>
            <p className="text-xl font-bold text-gray-900 font-mono tracking-wider">
              {bookingId}
            </p>
          </div>

          {/* Información de la cita */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Tu cita médica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-700 font-medium">Fecha</p>
                <p className="text-blue-900 font-semibold">
                  {bookingData.selectedDate?.toLocaleDateString('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Horario</p>
                <p className="text-blue-900 font-semibold">{bookingData.selectedTime}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Médico</p>
                <p className="text-blue-900 font-semibold">Dr. Osvaldo</p>
              </div>
            </div>
          </div>

          {/* Información del paciente */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Datos del paciente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Paciente</p>
                <p className="text-gray-900 font-medium">
                  {bookingData.patientInfo?.firstName} {bookingData.patientInfo?.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Obra Social</p>
                <p className="text-gray-900 font-medium">
                  {bookingData.patientInfo?.insurance && getInsuranceLabel(bookingData.patientInfo.insurance)}
                </p>
              </div>
            </div>
          </div>

          {/* Recordatorios */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Recordatorios importantes
            </h3>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                Llega 15 minutos antes de tu cita
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                Trae tu DNI y carnet de obra social
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                Guarda este número de reserva: <span className="font-mono font-semibold">{bookingId}</span>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
            <p className="mb-2">
              <span className="font-medium">Consultorio Dr. Osvaldo</span>
            </p>
            <p>Si necesitas reprogramar o cancelar tu cita:</p>
            <p className="font-medium text-gray-900">📞 (011) 4444-5555</p>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center pt-4">
            <a
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};