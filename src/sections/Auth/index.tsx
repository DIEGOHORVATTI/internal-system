import Logo from '@/components/logo'

import { Stack } from '@mui/material'

import { LoginForm } from './LoginForm'
import { Content, Container } from './styles'

export default function Login() {
  return (
    <Container>
      <Content>
        <Stack alignItems="center" justifyContent="center">
          <Logo sx={{ width: 150, height: 80 }} />

          <LoginForm />
        </Stack>
      </Content>
    </Container>
  )
}
