import type { Insurance } from "../../types/admin";

interface InsuranceStatsProps {
  insurances: Insurance[];
}

export const InsuranceStats = ({ insurances }: InsuranceStatsProps) => {
  const activeCount = insurances.filter(i => i.isActive).length;
  const inactiveCount = insurances.filter(i => !i.isActive).length;
  const totalCount = insurances.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Activas</p>
            <p className="text-lg font-semibold text-gray-900">{activeCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Inactivas</p>
            <p className="text-lg font-semibold text-gray-900">{inactiveCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-900">{totalCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};