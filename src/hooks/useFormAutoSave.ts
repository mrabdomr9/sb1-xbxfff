import { useCallback } from 'react'
import { useAutoSave } from './useAutoSave'

interface FormAutoSaveOptions<T> {
  formData: T
  onSave: (data: T) => Promise<{ success: boolean; error?: string }>
  validationSchema?: any // Zod schema or custom validation
  debounceMs?: number
  enableAutoSave?: boolean
}

export function useFormAutoSave<T>({
  formData,
  onSave,
  validationSchema,
  debounceMs = 2000,
  enableAutoSave = true
}: FormAutoSaveOptions<T>) {
  
  const validateForm = useCallback((data: T) => {
    if (!validationSchema) return { isValid: true }
    
    try {
      if (validationSchema.parse) {
        // Zod schema
        validationSchema.parse(data)
        return { isValid: true }
      } else if (typeof validationSchema === 'function') {
        // Custom validation function
        return validationSchema(data)
      }
      return { isValid: true }
    } catch (error: any) {
      const errors = error.errors?.map((e: any) => e.message) || [error.message || 'Validation failed']
      return { isValid: false, errors }
    }
  }, [validationSchema])

  const autoSave = useAutoSave({
    data: formData,
    onSave,
    onValidate: validateForm,
    debounceMs,
    enableAutoSave
  })

  return autoSave
}