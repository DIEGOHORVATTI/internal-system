import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconify from '@/components/iconify'
import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'

import { Stack, Button, IconButton, Typography, InputAdornment } from '@mui/material'

export const LoginForm = () => {
  // const { login } = useAuth()

  const login = (data: { email: string; password: string }) => {
    console.log('Login data:', data)
    // Implement your login logic here
  }

  const [showPassword, setShowPassword] = useState(false)

  const defaultValues = {
    email: '',
    password: '',
  }

  const methods = useForm<{ email: string; password: string }>({ defaultValues })

  const { handleSubmit } = methods

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(login)}>
      <Stack spacing={3}>
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', fontWeight: 'bold', alignItems: 'center' }}
        >
          Bem vindo(a) à Azeplast
        </Typography>

        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
          <RHFTextField
            name="email"
            label="Email"
            placeholder="Digite seu email"
            autoComplete="email"
            InputLabelProps={{ shrink: true }}
          />

          <RHFTextField
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          Entrar
        </Button>
      </Stack>
    </FormProvider>
  )
}
