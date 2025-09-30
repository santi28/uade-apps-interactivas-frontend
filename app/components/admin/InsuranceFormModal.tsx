import { useState, useEffect } from "react";
import type { Insurance } from "../../types/admin";
import { validateCreateInsurance, validateUpdateInsurance, type CreateInsuranceInput } from "../../schemas";

interface InsuranceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (insurance: CreateInsuranceInput | Insurance) => void;
  insurance?: Insurance | null; // null para crear, Insurance para editar
}

export const InsuranceFormModal = ({ isOpen, onClose, onSave, insurance }: InsuranceFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    isActive: true,
    contactInfo: {
      phone: "",
      email: "",
      address: ""
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos cuando se edita una obra social
  useEffect(() => {
    if (insurance) {
      setFormData({
        name: insurance.name,
        code: insurance.code,
        isActive: insurance.isActive,
        contactInfo: { ...insurance.contactInfo }
      });
    } else {
      // Reset form para crear nueva
      setFormData({
        name: "",
        code: "",
        isActive: true,
        contactInfo: {
          phone: "",
          email: "",
          address: ""
        }
      });
    }
    setErrors({});
  }, [insurance, isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('contactInfo.')) {
      const contactField = field.replace('contactInfo.', '');
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const validation = insurance 
      ? validateUpdateInsurance({ ...formData, id: insurance.id })
      : validateCreateInsurance(formData);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        // Mapear paths anidados a campos planos
        const fieldName = path.includes('contactInfo.') 
          ? path.replace('contactInfo.', '') 
          : path;
        newErrors[fieldName] = issue.message;
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (insurance) {
        // Editando - incluir ID
        onSave({ ...formData, id: insurance.id });
      } else {
        // Creando - sin ID
        onSave(formData);
      }
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {insurance ? 'Editar Obra Social' : 'Nueva Obra Social'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ej: OSDE, Swiss Medical"
              className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Código */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Código <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
              placeholder="Ej: OSDE001, SM002"
              className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.code ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          </div>

          {/* Estado Activo */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Obra social activa</span>
            </label>
          </div>

          {/* Información de Contacto */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Información de Contacto</h3>
            
            {/* Teléfono */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                placeholder="+54 11 1234-5678"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                placeholder="contacto@obrasocial.com"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Dirección */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                value={formData.contactInfo.address}
                onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                placeholder="Av. Corrientes 1234, CABA"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {insurance ? 'Guardar Cambios' : 'Crear Obra Social'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};