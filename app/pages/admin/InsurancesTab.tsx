import { useState } from "react";
import type { Insurance } from "../../types/admin";
import { mockInsurances } from "../../data/mock-data";
import { InsuranceStats } from "../../components/admin/InsuranceStats";
import { InsuranceGrid, InsuranceFormModal, DeleteConfirmModal } from "../../components/admin";

export const InsurancesTab = () => {
  const [insurances, setInsurances] = useState<Insurance[]>(mockInsurances);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState<Insurance | null>(null);
  const [deletingInsurance, setDeletingInsurance] = useState<Insurance | null>(null);

  const handleAdd = () => {
    setEditingInsurance(null);
    setShowFormModal(true);
  };

  const handleEdit = (insurance: Insurance) => {
    setEditingInsurance(insurance);
    setShowFormModal(true);
  };

  const handleDelete = (insurance: Insurance) => {
    setDeletingInsurance(insurance);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (data: Omit<Insurance, 'id'>) => {
    if (editingInsurance) {
      // Editar obra social existente
      setInsurances(prev => 
        prev.map(insurance => 
          insurance.id === editingInsurance.id 
            ? { ...data, id: editingInsurance.id }
            : insurance
        )
      );
    } else {
      // Crear nueva obra social
      const newInsurance: Insurance = {
        ...data,
        id: `insurance_${Date.now()}`,
      };
      setInsurances(prev => [...prev, newInsurance]);
    }
    setShowFormModal(false);
    setEditingInsurance(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingInsurance) {
      setInsurances(prev => 
        prev.filter(insurance => insurance.id !== deletingInsurance.id)
      );
      setShowDeleteModal(false);
      setDeletingInsurance(null);
    }
  };

  const handleCloseModals = () => {
    setShowFormModal(false);
    setShowDeleteModal(false);
    setEditingInsurance(null);
    setDeletingInsurance(null);
  };

  return (
    <div className="space-y-6">
      <InsuranceStats insurances={insurances} />
      <InsuranceGrid 
        insurances={insurances}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Form Modal */}
      <InsuranceFormModal
        isOpen={showFormModal}
        onClose={handleCloseModals}
        onSave={handleFormSubmit}
        insurance={editingInsurance}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        insuranceName={deletingInsurance?.name || ''}
      />
    </div>
  );
};