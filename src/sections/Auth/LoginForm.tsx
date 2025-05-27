import useAuth from '@/hooks/use-auth'
import { useForm } from 'react-hook-form'
import RHFPassword from '@/components/hook-form/rhf-password'
import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export const LoginForm = () => {
  const { login } = useAuth()

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

          <RHFPassword
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          Entrar
        </Button>
      </Stack>
    </FormProvider>
  )
}
