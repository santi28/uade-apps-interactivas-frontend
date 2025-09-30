import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { useState, useCallback } from "react";
import type { BookingStepProps } from "../../types/booking";
import { isDateDisabled } from "../../data/booking-data";
import ErrorBoundary from "../ui/ErrorBoundary";

export const DateSelection = ({ bookingData, onNext }: BookingStepProps) => {
  const [error, setError] = useState<string>("");

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setError("");
    if (date) {
      if (isDateDisabled(date)) {
        setError("La fecha seleccionada no está disponible.");
        return;
      }
      onNext({ selectedDate: date });
    }
  }, [onNext]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Seleccionar fecha
        </h2>
        <p className="text-gray-600">
          Elige el día para tu cita médica
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <ErrorBoundary>
            <DayPicker
            mode="single"
            selected={bookingData.selectedDate}
            onSelect={handleDateSelect}
            showOutsideDays
            disabled={isDateDisabled}
            locale={es}
            classNames={{
              root: "w-full mx-auto max-w-md",
              months: "flex flex-col space-y-4",
              month: "space-y-4",
              month_caption: "flex justify-between items-center pt-2 pb-4 px-2",
              caption_label: "text-lg font-semibold text-gray-800 flex-1 text-center",
              nav: "flex items-center space-x-2",
              button_previous: "w-8 h-8 bg-transparent hover:bg-gray-100 border-none rounded-md flex items-center justify-center text-gray-600 cursor-pointer transition-colors",
              button_next: "w-8 h-8 bg-transparent hover:bg-gray-100 border-none rounded-md flex items-center justify-center text-gray-600 cursor-pointer transition-colors",
              month_grid: "w-full",
              weekdays: "grid grid-cols-7 mb-2 border-b border-gray-200 pb-2",
              weekday: "text-gray-500 text-xs font-medium uppercase text-center py-2",
              week: "grid grid-cols-7 gap-1 mb-1",
              day: "p-0 relative",
              day_button: "w-full h-10 text-center text-sm font-normal border-none bg-transparent rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600",
              selected: "!bg-blue-600 !text-white hover:!bg-blue-700 font-semibold shadow-sm",
              today: "!bg-gray-100 !text-gray-900 font-semibold border border-gray-300",
              outside: "!text-gray-400 opacity-60",
              disabled: "!text-gray-300 !cursor-not-allowed hover:!bg-transparent hover:!text-gray-300 opacity-40 line-through",
            }}
            />
          </ErrorBoundary>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {bookingData.selectedDate && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Fecha seleccionada</p>
                  <p className="text-blue-900 font-semibold">
                    {bookingData.selectedDate.toLocaleDateString('es-AR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => onNext({ selectedDate: bookingData.selectedDate })}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};