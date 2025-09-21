import type { Route } from "./+types/home";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { es } from "react-day-picker/locale";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dr. Osvaldo - Sistema de Turnos" },
    { name: "description", content: "Sistema de turnos para Dr. Osvaldo" },
  ];
}

export default function Home() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  
  const isWeekend = (day: Date) => day.getDay() === 0 || day.getDay() === 6; // Sunday or Saturday
  const isSpecificDate = (day: Date) => day.getDate() === 15 && day.getMonth() === 8; // September 15th (0-indexed month)
  const isPastDate = (day: Date) => day < new Date(); // Dates before today

  const disableMultipleConditions = (day: Date) => {
    return isWeekend(day) || isSpecificDate(day) || isPastDate(day);
  };

  return (
    <>
      <header className="p-4 border-b w-full border-neutral-300">
        <a href="/">
          <p className="text-2xl font-bold text-center">Dr. Osvaldo</p>
        </a>
      </header>
      <main className="flex max-w-6xl flex-col mx-auto p-4 mt-4">
        <header className="mb-4">
          <h1 className="text-xl font-bold">
            Pedí tu turno online
          </h1>
          <p className="text-sm">
            Seleccioná el día y el horario que más te convenga
          </p>
        </header>

        <div>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays
            disabled={disableMultipleConditions}
            locale={es}
          />
        </div>

      </main>
    </>
  );
}
