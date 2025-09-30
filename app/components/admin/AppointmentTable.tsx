import type { Appointment } from "../../types/admin";
import { getStatusColor, getStatusText } from "../../utils/status-helpers";

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange: (appointmentId: string, newStatus: Appointment['status']) => void;
}

export const AppointmentTable = ({ appointments, onStatusChange }: AppointmentTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Citas Médicas</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha y Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Obra Social
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                    <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString('es-AR', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{appointment.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{appointment.insurance}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => onStatusChange(appointment.id, 'confirmed')}
                      className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2 py-1 rounded-md transition-colors"
                    >
                      Confirmar
                    </button>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button
                      onClick={() => onStatusChange(appointment.id, 'completed')}
                      className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors"
                    >
                      Completar
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors">
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};