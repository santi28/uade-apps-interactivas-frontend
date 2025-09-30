import { useState } from "react";
import type { Appointment } from "../../types/admin";
import { mockAppointments } from "../../data/mock-data";
import { AppointmentStats } from "../../components/admin/AppointmentStats";
import { AppointmentTable } from "../../components/admin/AppointmentTable";

export const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    console.log(`Estado de cita ${appointmentId} cambiado a ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <AppointmentStats appointments={appointments} />
      <AppointmentTable 
        appointments={appointments} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};