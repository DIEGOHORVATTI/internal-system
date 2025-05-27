import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function MainContent({ children }: React.PropsWithChildren) {
  return (
    <Box component="main">
      <Container maxWidth={false} sx={{ minHeight: '100vh' }}>
        {children}
      </Container>
    </Box>
  )
}
