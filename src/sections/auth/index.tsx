import Logo from '@/components/logo'

import { Stack } from '@mui/material'

import { LoginForm } from './LoginForm'
import { Content, Container } from './styles'

export default function Login() {
  return (
    <Container>
      <Content>
        <Stack spacing={3} alignItems="center" justifyContent="center" width={1}>
          <Logo showTitle />

          <LoginForm />
        </Stack>
      </Content>
    </Container>
  )
}
