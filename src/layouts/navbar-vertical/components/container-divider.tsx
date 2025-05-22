import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}))

export default function ContainerDivider({ children }: React.PropsWithChildren) {
  return (
    <Container>
      <Divider textAlign="left">{children}</Divider>
    </Container>
  )
}
