import type { Route } from "./+types/book";
import { useState } from "react";
import type { BookingStep, BookingData } from "../types/booking";
import {
  ProgressIndicator,
  DateSelection,
  TimeSelection,
  PatientForm,
  BookingConfirmation,
  BookingSuccess
} from "../components/booking";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reservar Cita - Dr. Osvaldo" },
    { name: "description", content: "Reserva tu cita médica con Dr. Osvaldo de forma fácil y rápida" },
  ];
}

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleNext = (data: Partial<BookingData>) => {
    const newBookingData = { ...bookingData, ...data };
    setBookingData(newBookingData);

    // Determinar el siguiente paso
    switch (currentStep) {
      case 'date':
        if (newBookingData.selectedDate) {
          setCurrentStep('time');
        }
        break;
      case 'time':
        if (newBookingData.selectedTime) {
          setCurrentStep('form');
        }
        break;
      case 'form':
        if (newBookingData.patientInfo) {
          setCurrentStep('confirmation');
        }
        break;
      case 'confirmation':
        setCurrentStep('date'); // Esto se manejará de forma diferente
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'time':
        setCurrentStep('date');
        break;
      case 'form':
        setCurrentStep('time');
        break;
      case 'confirmation':
        setCurrentStep('form');
        break;
    }
  };

  const handleConfirmationNext = () => {
    // Aquí iría la lógica para enviar la reserva al backend
    // Por ahora, simplemente mostramos el componente de éxito
    setCurrentStep('confirmation' as BookingStep); // Temporal
  };

  const renderCurrentStep = () => {
    const stepProps = {
      bookingData,
      onNext: currentStep === 'confirmation' ? handleConfirmationNext : handleNext,
      onBack: currentStep !== 'date' ? handleBack : undefined
    };

    switch (currentStep) {
      case 'date':
        return <DateSelection {...stepProps} />;
      case 'time':
        return <TimeSelection {...stepProps} />;
      case 'form':
        return <PatientForm {...stepProps} />;
      case 'confirmation':
        return <BookingConfirmation {...stepProps} />;
      default:
        return <DateSelection {...stepProps} />;
    }
  };

  // Estado especial para mostrar el éxito
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmBooking = () => {
    setShowSuccess(true);
  };

  // Actualizar el handleConfirmationNext
  const actualConfirmationNext = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <>
        <header className="p-4 border-b w-full border-neutral-300 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <a href="/">
              <p className="text-2xl font-bold text-gray-800">Dr. Osvaldo</p>
            </a>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                Inicio
              </a>
              <a href="/bookings" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                Mis citas
              </a>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingSuccess bookingData={bookingData} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="p-4 border-b w-full border-neutral-300 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/">
            <p className="text-2xl font-bold text-gray-800">Dr. Osvaldo</p>
          </a>
          <nav className="flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Inicio
            </a>
            <a href="/bookings" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Mis citas
            </a>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reservar Cita Médica
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sigue estos simples pasos para reservar tu cita con Dr. Osvaldo
            </p>
          </header>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} />

          {/* Current Step Content */}
          <div className="transition-all duration-300">
            {currentStep === 'confirmation' ? (
              <BookingConfirmation 
                bookingData={bookingData}
                onNext={actualConfirmationNext}
                onBack={handleBack}
              />
            ) : (
              renderCurrentStep()
            )}
          </div>
        </div>
      </main>
    </>
  );
}