import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

import { m } from 'framer-motion'
import { MotionContainer, varBounce } from '@/components/animate'

import PageNotFoundIllustration from '@/assets/illustration_404'

export default function Page404() {
  return (
    <Container
      component={MotionContainer}
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" component={'p'}>
            Página não encontrada
          </Typography>
        </m.div>

        <Typography sx={{ color: 'text.secondary' }}>
          Desculpe, a página que você está procurando não existe ou foi removida.
        </Typography>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <MuiLink component={Link} to="/">
          <Button size="large" variant="contained">
            Voltar para home
          </Button>
        </MuiLink>
      </Box>
    </Container>
  )
}
