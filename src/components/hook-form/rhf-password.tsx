import type { FieldValues } from 'react-hook-form'
import type { TextFieldProps } from '@mui/material/TextField'

import { useState } from 'react'
import Iconify from '@/components/iconify'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import RHFTextField, { type RHFTextFieldProps } from './rhf-text-field'

export default function RHFPassword<T extends FieldValues>({
  name,
  ...other
}: Omit<TextFieldProps, 'type'> & RHFTextFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <RHFTextField<T>
      name={name}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        sx: { paddingRight: 0.5 },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  )
}
