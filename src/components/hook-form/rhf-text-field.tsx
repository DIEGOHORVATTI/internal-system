import TextField, { type TextFieldProps } from '@mui/material/TextField'

import { useFormContext, Controller, type FieldValues, type FieldPath } from 'react-hook-form'

type FormFieldValues = {
  [key: string]: string | number
}

export type RHFTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  maxWidth?: number
  maxLength?: number
  min?: number
  max?: number
}

export default function RHFTextField<T extends FieldValues>({
  name,
  required,
  helperText,
  min,
  max,
  maxWidth,
  maxLength,
  ...other
}: TextFieldProps & RHFTextFieldProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller<FormFieldValues>
      name={name}
      control={control}
      rules={{
        maxLength: maxLength && {
          value: maxLength,
          message: `Máximo: ${maxLength} caracteres`,
        },
        required: required && 'Campo obrigatório',
        ...(min && { min: { value: min, message: `Mínimo ${min}` } }),
        ...(max && { max: { value: max, message: `Máximo ${max}` } }),
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            aria-required={required}
            error={!!error}
            helperText={error && (helperText || error?.message)}
            {...other}
            inputProps={{
              maxLength,
              ...other.inputProps,
            }}
            sx={{
              maxWidth,
              ...other?.sx,
            }}
            onChange={(event) => {
              const value = event.target.value

              field?.onChange(value)
            }}
          />
        )
      }}
    />
  )
}
