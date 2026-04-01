import { Check } from 'lucide-react';
import clsx from 'clsx';

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
                  isDone && 'text-white',
                  isActive && 'text-white ring-4 ring-green-100',
                  !isDone && !isActive && 'text-gray-400 bg-gray-100'
                )}
                style={
                  isDone
                    ? { backgroundColor: '#1A6B3A' }
                    : isActive
                    ? { backgroundColor: '#1A6B3A' }
                    : {}
                }
              >
                {isDone ? <Check size={16} /> : stepNum}
              </div>
              <span
                className={clsx(
                  'text-xs mt-1.5 font-medium whitespace-nowrap',
                  isActive ? 'text-green-700' : isDone ? 'text-gray-600' : 'text-gray-400'
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={clsx('flex-1 h-0.5 mx-2 mb-5 transition-colors duration-300')}
                style={{
                  backgroundColor: stepNum < currentStep ? '#1A6B3A' : '#E5E7EB',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
