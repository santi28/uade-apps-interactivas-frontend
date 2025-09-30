import { useState } from "react";
import type { BookingStepProps } from "../../types/booking";
import { getTimeSlotAvailability } from "../../data/booking-data";

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

const TimeSlot = ({ time, isSelected, isAvailable, onClick }: TimeSlotProps) => (
  <button
    onClick={onClick}
    disabled={!isAvailable}
    className={`
      w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
      border-2 text-center min-h-[48px] flex items-center justify-center
      ${isSelected 
        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
        : isAvailable 
          ? 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50' 
          : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
      }
    `}
  >
    {time}
  </button>
);

export const TimeSelection = ({ bookingData, onNext, onBack }: BookingStepProps) => {
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.selectedTime || "");
  
  const timeSlots = bookingData.selectedDate 
    ? getTimeSlotAvailability(bookingData.selectedDate)
    : [];

  const morningSlots = timeSlots.slice(0, 6); // 9:00 - 11:30
  const afternoonSlots = timeSlots.slice(6); // 13:00 - 17:30

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedTime) {
      onNext({ selectedTime });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Seleccionar horario
            </h2>
            <p className="text-gray-600">
              Fecha: {bookingData.selectedDate?.toLocaleDateString('es-AR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Cambiar fecha
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Horarios de mañana */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Mañana (9:00 - 12:00)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {morningSlots.map(({ time, isAvailable }) => (
              <TimeSlot
                key={time}
                time={time}
                isSelected={selectedTime === time}
                isAvailable={isAvailable}
                onClick={() => handleTimeSelect(time)}
              />
            ))}
          </div>
        </div>

        {/* Horarios de tarde */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Tarde (13:00 - 18:00)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {afternoonSlots.map(({ time, isAvailable }) => (
              <TimeSlot
                key={time}
                time={time}
                isSelected={selectedTime === time}
                isAvailable={isAvailable}
                onClick={() => handleTimeSelect(time)}
              />
            ))}
          </div>
        </div>

        {selectedTime && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Horario seleccionado</p>
                <p className="text-green-900 font-semibold">{selectedTime}</p>
              </div>
              <button
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};