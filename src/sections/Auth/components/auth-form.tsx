import useAuth from '@/hooks/use-auth'
import { useForm } from 'react-hook-form'
import SettingMode from '@/components/setting-mode'
import { generateJwt } from '@/shared/generate-jwt'
import RHFPassword from '@/components/hook-form/rhf-password'
import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'

import { Box, Card, Stack, Button, Typography } from '@mui/material'

type FormValues = {
  email: string
  password: string
}

export const AuthForm = () => {
  const { login } = useAuth()

  const methods = useForm<FormValues>({ defaultValues: { email: '', password: '' } })

  const { handleSubmit } = methods

  const handle = ({ email, password }: FormValues) => {
    const token = generateJwt({ email, password })

    login(token)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      <Card component={Stack} spacing={2} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Login
        </Typography>

        <Card
          component={Stack}
          spacing={2}
          sx={{ p: 1, width: '100%', bgcolor: 'background.neutral' }}
        >
          <SettingMode />
        </Card>

        <FormProvider methods={methods} onSubmit={handleSubmit(handle)}>
          <Stack spacing={3}>
            <RHFTextField required name="email" label="Email" />

            <RHFPassword required name="password" label="Senha" />

            <Button size="large" type="submit" variant="contained">
              Entrar
            </Button>
          </Stack>
        </FormProvider>
      </Card>
    </Box>
  )
}
