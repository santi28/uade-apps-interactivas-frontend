import type { Insurance } from '../../types/admin';

interface InsuranceGridProps {
  insurances: Insurance[];
  onEdit: (insurance: Insurance) => void;
  onDelete: (insurance: Insurance) => void;
  onAdd: () => void;
}

export const InsuranceGrid = ({ insurances, onEdit, onDelete, onAdd }: InsuranceGridProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Obras Sociales</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={onAdd}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Agregar Obra Social</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insurances.map((insurance) => (
          <div key={insurance.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-3">
              <span className={`
                inline-flex px-2 py-1 text-xs font-medium rounded-full
                ${insurance.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }
              `}>
                {insurance.isActive ? 'Activa' : 'Inactiva'}
              </span>
              
              <div className="flex space-x-1">
                <button 
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  onClick={() => onEdit(insurance)}
                  title="Editar obra social"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  onClick={() => onDelete(insurance)}
                  title="Eliminar obra social"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Insurance Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{insurance.name}</h3>
              <p className="text-sm text-gray-600">Código: {insurance.code}</p>
              {insurance.contactInfo.phone && (
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>{insurance.contactInfo.phone}</span>
                </p>
              )}
              {insurance.contactInfo.email && (
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{insurance.contactInfo.email}</span>
                </p>
              )}
              {insurance.contactInfo.address && (
                <p className="text-sm text-gray-600 flex items-start space-x-1">
                  <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="leading-tight">{insurance.contactInfo.address}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {insurances.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mt-4">No hay obras sociales</h3>
          <p className="text-gray-500 mt-2">Comienza agregando una nueva obra social.</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={onAdd}
          >
            Agregar Primera Obra Social
          </button>
        </div>
      )}
    </div>
  );
};