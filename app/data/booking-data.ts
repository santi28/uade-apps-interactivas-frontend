import type { InsuranceOption, TimeSlotAvailability } from "../types/booking";

// Lista de obras sociales disponibles
export const insuranceOptions: InsuranceOption[] = [
  { value: "osde", label: "OSDE" },
  { value: "swiss-medical", label: "Swiss Medical" },
  { value: "galeno", label: "Galeno" },
  { value: "medicus", label: "Medicus" },
  { value: "sancor-salud", label: "Sancor Salud" },
  { value: "omint", label: "OMINT" },
  { value: "particular", label: "Particular" }
];

// Generar horarios disponibles (9:00 - 18:00 con break 12:00-13:00)
export const generateTimeSlots = (): string[] => {
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

// Simular disponibilidad de horarios para una fecha específica
export const getTimeSlotAvailability = (date: Date): TimeSlotAvailability[] => {
  const allSlots = generateTimeSlots();

  // Simular algunos horarios ocupados (en una app real vendría del backend)
  const bookedSlots = ['10:30', '14:00', '15:30', '16:00'];

  return allSlots.map(time => ({
    time,
    isAvailable: !bookedSlots.includes(time),
    isBooked: bookedSlots.includes(time)
  }));
};

// Validar si una fecha es seleccionable
export const isDateDisabled = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Deshabilitar fines de semana
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  // Deshabilitar fechas pasadas
  const isPastDate = date < today;

  // Deshabilitar fechas específicas (ejemplo: feriados)
  const isSpecificDate = date.getDate() === 15 && date.getMonth() === 8; // 15 de septiembre

  return isWeekend || isPastDate || isSpecificDate;
};