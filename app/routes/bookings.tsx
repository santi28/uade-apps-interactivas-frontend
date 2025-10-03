import type { Route } from "./+types/home";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { es } from "react-day-picker/locale";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mis Citas - Dr. Osvaldo Méndez" },
    { name: "description", content: "Gestiona tus citas médicas con el Dr. Osvaldo Méndez" },
  ];
}

// Generar horarios disponibles (9:00 - 18:00 con break 12:00-13:00)
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  
  // Mañana: 9:00 - 12:00
  for (let hour = 9; hour < 12; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  
  // Tarde: 13:00 - 18:00
  for (let hour = 13; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

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

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const isWeekend = (day: Date) => day.getDay() === 0 || day.getDay() === 6;
  const isSpecificDate = (day: Date) => day.getDate() === 15 && day.getMonth() === 8;
  const isPastDate = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const disableMultipleConditions = (day: Date) => {
    return isWeekend(day) || isSpecificDate(day) || isPastDate(day);
  };


  // Simular disponibilidad de horarios (en una app real vendría del backend)
  const isTimeSlotAvailable = (time: string): boolean => {
    // Algunos horarios ocupados para demo
    const bookedSlots = ['10:30', '14:00', '15:30', '16:00'];
    return !bookedSlots.includes(time);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`Turno reservado para ${selectedDate.toLocaleDateString('es-AR')} a las ${selectedTime}`);
    } else {
      alert('Por favor selecciona una fecha y horario');
    }
  };

  return (
    <>
      <header className="p-4 border-b w-full border-neutral-300 bg-white sticky top-0 z-10">
        <a href="/">
          <p className="text-2xl font-bold text-center text-gray-800">Dr. Osvaldo</p>
        </a>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-6 sm:mb-8 max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Pedí tu turno online
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Seleccioná el día y el horario que más te convenga
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto">
            {/* Calendar Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <header>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Seleccionar fecha
                </h2>

              </header>
              
              <div className="w-full">
                <DayPicker
                  hideNavigation
                  captionLayout="label"
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  showOutsideDays
                  disabled={disableMultipleConditions}
                  locale={es}
                  classNames={{
                    root: "w-full mx-auto max-w-md",
                    months: "flex flex-col space-y-4",
                    month: "space-y-4",
                    caption_label: "text-sm font-normal text-stone-800 flex-1",
                    nav: "flex items-center space-x-2",
                    button_previous: "w-8 h-8 bg-transparent hover:bg-gray-100 border-none rounded-md flex items-center justify-center text-gray-600 cursor-pointer transition-colors",
                    button_next: "w-8 h-8 bg-transparent hover:bg-gray-100 border-none rounded-md flex items-center justify-center text-gray-600 cursor-pointer transition-colors",
                    month_grid: "w-full",
                    weekdays: "grid grid-cols-7 mb-2 border-b border-gray-200 pb-2",
                    weekday: "text-gray-500 text-xs font-medium uppercase text-center py-2",
                    week: "grid grid-cols-7 gap-1 mb-1",
                    day: "p-0 relative",
                    day_button: "w-full h-10 text-center text-sm font-normal border-none bg-transparent rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-blue-50",
                    selected: "!bg-blue-600 !text-white hover:!bg-blue-700 font-semibold shadow-sm rounded-lg",
                    today: "!bg-gray-100 !text-gray-900 font-semibold border border-gray-300",
                    outside: "!text-gray-400 opacity-60",
                    disabled: "!text-gray-300 !cursor-not-allowed hover:!bg-transparent hover:!text-gray-300 opacity-40 line-through",
                  }}
                />
              </div>
              
              {selectedDate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Fecha seleccionada:</span> {selectedDate.toLocaleDateString('es-AR')}
                  </p>
                </div>
              )}
            </div>

            {/* Time Slots Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Horarios disponibles
              </h2>
              
              {!selectedDate ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500">Primero selecciona una fecha</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Mañana (9:00 - 12:00)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.slice(0, 6).map((time) => (
                        <TimeSlot
                          key={time}
                          time={time}
                          isSelected={selectedTime === time}
                          isAvailable={isTimeSlotAvailable(time)}
                          onClick={() => setSelectedTime(time)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Tarde (13:00 - 18:00)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.slice(6).map((time) => (
                        <TimeSlot
                          key={time}
                          time={time}
                          isSelected={selectedTime === time}
                          isAvailable={isTimeSlotAvailable(time)}
                          onClick={() => setSelectedTime(time)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {selectedTime && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-4">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Horario seleccionado:</span> {selectedTime}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Booking Button */}
          {selectedDate && selectedTime && (
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Confirmar turno
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {selectedDate.toLocaleDateString('es-AR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} a las {selectedTime}
                    </p>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    Reservar turno
                  </button>
                </div>
              </div>
            </div>
          )}
      </main>
    </>
  );
}
