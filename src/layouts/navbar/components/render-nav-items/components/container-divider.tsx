import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Box, { type BoxProps } from '@mui/material/Box'

export default function ContainerDivider({ children, ...props }: BoxProps) {
  return (
    <Container {...props}>
      <Divider textAlign="left">{children}</Divider>
    </Container>
  )
}

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}))
