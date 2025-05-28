import Box from '@mui/material/Box'

export default function MainContent({ children }: React.PropsWithChildren) {
  return <Box component="main">{children}</Box>
}
