import type { Appointment } from "../types/admin";

export const getStatusColor = (status: Appointment['status']): string => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: Appointment['status']): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'pending':
      return 'Pendiente';
    case 'cancelled':
      return 'Cancelada';
    case 'completed':
      return 'Completada';
    default:
      return 'Desconocido';
  }
};