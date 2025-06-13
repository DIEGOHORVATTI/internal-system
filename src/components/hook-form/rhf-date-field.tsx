import { Controller, useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'

import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers'

type Props<T extends FieldValues> = DatePickerProps & {
  name: FieldPath<T>
  label?: string
  required?: boolean
  helperText?: string
  min?: number
  max?: number
}

export default function RHFDateField<T extends FieldValues>({
  name,
  required,
  min,
  max,
  helperText,
  ...other
}: Props<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required && 'Campo obrigatório',
        ...(min && { min: { value: min, message: `Mínimo ${min}` } }),
        ...(max && { max: { value: max, message: `Máximo ${max}` } }),
      }}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...other}
          {...field}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              error: !!error,
              helperText,
            },
          }}
        />
      )}
    />
  )
}
