import type { BookingStep } from "../../types/booking";

interface ProgressIndicatorProps {
  currentStep: BookingStep;
}

interface StepInfo {
  id: BookingStep;
  label: string;
  description: string;
}

const steps: StepInfo[] = [
  { id: 'date', label: 'Fecha', description: 'Seleccionar día' },
  { id: 'time', label: 'Horario', description: 'Elegir hora' },
  { id: 'form', label: 'Datos', description: 'Completar información' },
  { id: 'confirmation', label: 'Confirmación', description: 'Revisar y confirmar' }
];

export const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
                  ${isCompleted ? 'bg-green-600 text-white' : ''}
                  ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                  ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                  index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};