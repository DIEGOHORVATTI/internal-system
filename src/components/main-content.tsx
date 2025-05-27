import { Box, Container } from '@mui/material'

export const MainContent = ({ children }: React.PropsWithChildren) => (
  <Box component="main">
    <Container maxWidth={false} sx={{ minHeight: '100vh' }}>
      {children}
    </Container>
  </Box>
)
