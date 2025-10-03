import { useState, useCallback, useMemo } from 'react';
import { z } from 'zod';

/**
 * Hook personalizado para validación de formularios con Zod
 * Proporciona validación en tiempo real, manejo de errores y estado del formulario
 */
export const useFormValidation = <T extends z.ZodSchema>(
  schema: T,
  initialData?: Partial<z.infer<T>>
) => {
  type FormData = z.infer<T>;
  type ValidationErrors = Partial<Record<keyof FormData, string>>;

  const [data, setData] = useState<Partial<FormData>>(initialData || {});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Validar todo el formulario
  const validateForm = useCallback((): { isValid: boolean; errors: ValidationErrors } => {
    setIsValidating(true);
    const result = schema.safeParse(data);

    if (result.success) {
      setErrors({});
      setIsValidating(false);
      return { isValid: true, errors: {} };
    }

    const newErrors: ValidationErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof FormData;
      if (field && !newErrors[field]) {
        newErrors[field] = issue.message;
      }
    });

    setErrors(newErrors);
    setIsValidating(false);
    return { isValid: false, errors: newErrors };
  }, [schema, data]);

  // Validar un campo específico
  const validateField = useCallback((field: keyof FormData, value: unknown) => {
    try {
      // Crear un esquema temporal solo para este campo
      const fieldSchema = (schema as any).shape[field];
      if (fieldSchema) {
        const result = fieldSchema.safeParse(value);
        if (result.success) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
          return { isValid: true, error: null };
        } else {
          const errorMessage = result.error.issues[0]?.message || 'Valor inválido';
          setErrors(prev => ({ ...prev, [field]: errorMessage }));
          return { isValid: false, error: errorMessage };
        }
      }
    } catch (error) {
      // Si no se puede validar el campo individualmente, validar todo el formulario
      const tempData = { ...data, [field]: value };
      const result = schema.safeParse(tempData);

      if (result.success) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
        return { isValid: true, error: null };
      } else {
        const fieldError = result.error.issues.find(issue => issue.path[0] === field);
        const errorMessage = fieldError?.message || 'Valor inválido';
        setErrors(prev => ({ ...prev, [field]: errorMessage }));
        return { isValid: false, error: errorMessage };
      }
    }

    return { isValid: true, error: null };
  }, [schema, data]);

  // Actualizar valor de campo
  const updateField = useCallback((field: keyof FormData, value: unknown) => {
    setData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validar campo en tiempo real si ya fue tocado
    if (touched[field]) {
      validateField(field, value);
    }
  }, [validateField, touched]);

  // Marcar campo como tocado
  const touchField = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, data[field]);
  }, [validateField, data]);

  // Resetear formulario
  const reset = useCallback((newData?: Partial<FormData>) => {
    setData(newData || {});
    setErrors({});
    setTouched({});
  }, []);

  // Verificar si el formulario es válido
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0 && Object.keys(touched).length > 0;
  }, [errors, touched]);

  // Verificar si hay campos con errores visibles (tocados y con error)
  const hasVisibleErrors = useMemo(() => {
    return Object.keys(errors).some(field =>
      touched[field as keyof FormData] && errors[field as keyof FormData]
    );
  }, [errors, touched]);

  // Obtener datos validados (solo si el formulario es válido)
  const getValidatedData = useCallback((): FormData | null => {
    const result = schema.safeParse(data);
    return result.success ? result.data : null;
  }, [schema, data]);

  return {
    // Estado
    data,
    errors,
    touched,
    isValidating,
    isValid,
    hasVisibleErrors,

    // Acciones
    updateField,
    touchField,
    validateForm,
    validateField,
    reset,
    getValidatedData
  };
};

/**
 * Hook para validación de campos individuales
 * Útil para validación en tiempo real de inputs específicos
 */
export const useFieldValidation = <T>(
  validator: (value: T) => { isValid: boolean; error: string | null }
) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback((newValue: T) => {
    const result = validator(newValue);
    setError(result.error);
    return result.isValid;
  }, [validator]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    if (touched) {
      validate(newValue);
    }
  }, [validate, touched]);

  const touch = useCallback(() => {
    setTouched(true);
    if (value !== undefined) {
      validate(value);
    }
  }, [validate, value]);

  const reset = useCallback(() => {
    setValue(undefined);
    setError(null);
    setTouched(false);
  }, []);

  return {
    value,
    error,
    touched,
    isValid: error === null && touched,
    updateValue,
    touch,
    reset
  };
};

/**
 * Hook para validación de listas/arrays
 * Útil para formularios dinámicos con elementos que se pueden agregar/eliminar
 */
export const useArrayValidation = <T>(
  itemSchema: z.ZodSchema<T>,
  minLength = 0,
  maxLength = Infinity
) => {
  const [items, setItems] = useState<T[]>([]);
  const [errors, setErrors] = useState<(string | null)[]>([]);

  const validateItem = useCallback((index: number, item: T) => {
    const result = itemSchema.safeParse(item);
    setErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = result.success ? null : result.error.issues[0]?.message || 'Valor inválido';
      return newErrors;
    });
    return result.success;
  }, [itemSchema]);

  const addItem = useCallback((item: T) => {
    if (items.length >= maxLength) return false;

    const newItems = [...items, item];
    setItems(newItems);
    setErrors(prev => [...prev, null]);
    validateItem(items.length, item);
    return true;
  }, [items, maxLength, validateItem]);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateItem = useCallback((index: number, item: T) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = item;
      return newItems;
    });
    validateItem(index, item);
  }, [validateItem]);

  const validateAll = useCallback(() => {
    if (items.length < minLength) {
      return { isValid: false, error: `Debe tener al menos ${minLength} elementos` };
    }

    if (items.length > maxLength) {
      return { isValid: false, error: `No puede tener más de ${maxLength} elementos` };
    }

    const allValid = items.every((item, index) => {
      const result = itemSchema.safeParse(item);
      if (!result.success) {
        setErrors(prev => {
          const newErrors = [...prev];
          newErrors[index] = result.error.issues[0]?.message || 'Valor inválido';
          return newErrors;
        });
        return false;
      }
      return true;
    });

    if (allValid) {
      setErrors(items.map(() => null));
    }

    return { isValid: allValid, error: null };
  }, [items, itemSchema, minLength, maxLength]);

  const reset = useCallback(() => {
    setItems([]);
    setErrors([]);
  }, []);

  const isValid = useMemo(() => {
    return errors.every(error => error === null) &&
      items.length >= minLength &&
      items.length <= maxLength;
  }, [errors, items.length, minLength, maxLength]);

  return {
    items,
    errors,
    isValid,
    addItem,
    removeItem,
    updateItem,
    validateAll,
    reset
  };
};