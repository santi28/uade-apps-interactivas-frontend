import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Insurance } from '../types/admin';
import { mockInsurances } from '../data/mock-data';
import { validateCreateInsurance, validateUpdateInsurance } from '../schemas/validation';

interface InsuranceState {
  // Estado
  insurances: Insurance[];
  selectedInsurance: Insurance | null;
  isLoading: boolean;
  error: string | null;

  // Modal states
  isFormModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editingInsurance: Insurance | null;
  deletingInsurance: Insurance | null;

  // Acciones básicas
  setInsurances: (insurances: Insurance[]) => void;
  addInsurance: (insurance: Omit<Insurance, 'id'>) => Promise<{ success: boolean; error?: string }>;
  updateInsurance: (id: string, updates: Partial<Omit<Insurance, 'id'>>) => Promise<{ success: boolean; error?: string }>;
  deleteInsurance: (id: string) => void;
  setSelectedInsurance: (insurance: Insurance | null) => void;

  // Estados de carga
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones de modal
  openFormModal: (insurance?: Insurance) => void;
  closeFormModal: () => void;
  openDeleteModal: (insurance: Insurance) => void;
  closeDeleteModal: () => void;
  closeAllModals: () => void;

  // Acciones específicas del negocio
  toggleInsuranceStatus: (id: string) => void;
  bulkUpdateStatus: (ids: string[], isActive: boolean) => void;

  // Selectores computados
  getActiveInsurances: () => Insurance[];
  getInactiveInsurances: () => Insurance[];
  searchInsurances: (query: string) => Insurance[];
  getInsuranceByCode: (code: string) => Insurance | undefined;
}

export const useInsuranceStore = create<InsuranceState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        insurances: mockInsurances,
        selectedInsurance: null,
        isLoading: false,
        error: null,

        // Modal states
        isFormModalOpen: false,
        isDeleteModalOpen: false,
        editingInsurance: null,
        deletingInsurance: null,

        // Acciones básicas
        setInsurances: (insurances) =>
          set({ insurances }, false, 'setInsurances'),

        addInsurance: async (insuranceData) => {
          const { setLoading, setError } = get();

          setLoading(true);
          setError(null);

          try {
            // Validar datos
            const validation = validateCreateInsurance(insuranceData);
            if (!validation.success) {
              const errorMessage = validation.error.issues[0]?.message || 'Datos inválidos';
              setError(errorMessage);
              setLoading(false);
              return { success: false, error: errorMessage };
            }

            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 500));

            const newInsurance: Insurance = {
              ...validation.data,
              id: `insurance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };

            set(
              (state) => ({
                insurances: [...state.insurances, newInsurance],
                isLoading: false
              }),
              false,
              'addInsurance'
            );

            return { success: true };
          } catch (error) {
            const errorMessage = 'Error al crear la obra social';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
          }
        },

        updateInsurance: async (id, updates) => {
          const { setLoading, setError, insurances } = get();

          setLoading(true);
          setError(null);

          try {
            const existingInsurance = insurances.find(ins => ins.id === id);
            if (!existingInsurance) {
              throw new Error('Obra social no encontrada');
            }

            const updatedData = { ...existingInsurance, ...updates };

            // Validar datos actualizados
            const validation = validateUpdateInsurance(updatedData);
            if (!validation.success) {
              const errorMessage = validation.error.issues[0]?.message || 'Datos inválidos';
              setError(errorMessage);
              setLoading(false);
              return { success: false, error: errorMessage };
            }

            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 500));

            set(
              (state) => ({
                insurances: state.insurances.map((insurance) =>
                  insurance.id === id ? { ...insurance, ...updates } : insurance
                ),
                selectedInsurance: state.selectedInsurance?.id === id
                  ? { ...state.selectedInsurance, ...updates }
                  : state.selectedInsurance,
                isLoading: false
              }),
              false,
              'updateInsurance'
            );

            return { success: true };
          } catch (error) {
            const errorMessage = 'Error al actualizar la obra social';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
          }
        },

        deleteInsurance: (id) =>
          set(
            (state) => ({
              insurances: state.insurances.filter((insurance) => insurance.id !== id),
              selectedInsurance: state.selectedInsurance?.id === id ? null : state.selectedInsurance
            }),
            false,
            'deleteInsurance'
          ),

        setSelectedInsurance: (insurance) =>
          set({ selectedInsurance: insurance }, false, 'setSelectedInsurance'),

        // Estados de carga
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        setError: (error) => set({ error }, false, 'setError'),

        // Acciones de modal
        openFormModal: (insurance) =>
          set(
            {
              isFormModalOpen: true,
              editingInsurance: insurance || null,
              isDeleteModalOpen: false
            },
            false,
            'openFormModal'
          ),

        closeFormModal: () =>
          set(
            {
              isFormModalOpen: false,
              editingInsurance: null
            },
            false,
            'closeFormModal'
          ),

        openDeleteModal: (insurance) =>
          set(
            {
              isDeleteModalOpen: true,
              deletingInsurance: insurance,
              isFormModalOpen: false
            },
            false,
            'openDeleteModal'
          ),

        closeDeleteModal: () =>
          set(
            {
              isDeleteModalOpen: false,
              deletingInsurance: null
            },
            false,
            'closeDeleteModal'
          ),

        closeAllModals: () =>
          set(
            {
              isFormModalOpen: false,
              isDeleteModalOpen: false,
              editingInsurance: null,
              deletingInsurance: null
            },
            false,
            'closeAllModals'
          ),

        // Acciones específicas del negocio
        toggleInsuranceStatus: (id) => {
          const { updateInsurance, insurances } = get();
          const insurance = insurances.find(ins => ins.id === id);
          if (insurance) {
            updateInsurance(id, { isActive: !insurance.isActive });
          }
        },

        bulkUpdateStatus: (ids, isActive) => {
          set(
            (state) => ({
              insurances: state.insurances.map((insurance) =>
                ids.includes(insurance.id) ? { ...insurance, isActive } : insurance
              )
            }),
            false,
            'bulkUpdateStatus'
          );
        },

        // Selectores computados
        getActiveInsurances: () => {
          const { insurances } = get();
          return insurances.filter((insurance) => insurance.isActive);
        },

        getInactiveInsurances: () => {
          const { insurances } = get();
          return insurances.filter((insurance) => !insurance.isActive);
        },

        searchInsurances: (query) => {
          const { insurances } = get();
          const searchLower = query.toLowerCase();

          return insurances.filter((insurance) =>
            insurance.name.toLowerCase().includes(searchLower) ||
            insurance.code.toLowerCase().includes(searchLower) ||
            insurance.contactInfo.email.toLowerCase().includes(searchLower)
          );
        },

        getInsuranceByCode: (code) => {
          const { insurances } = get();
          return insurances.find((insurance) =>
            insurance.code.toLowerCase() === code.toLowerCase()
          );
        }
      }),
      {
        name: 'insurance-store',
        // Solo persistir datos importantes
        partialize: (state) => ({
          insurances: state.insurances
        })
      }
    ),
    {
      name: 'insurance-store'
    }
  )
);