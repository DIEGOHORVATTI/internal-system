import { Stack, Typography } from '@mui/material'

import Iconify from '@/components/iconify'
import ContainerDivider from './container-divider'

import { m } from 'framer-motion'
import { MotionContainer } from '@/components/animate'

import type { Navigation } from '@/routes/nav-config'

type HeaderProps = Pick<Navigation, 'title'> & {
  isOpen: boolean
  onToggle: VoidFunction
}

export default function Header({ title, isOpen, onToggle }: HeaderProps) {
  return (
    <ContainerDivider pt={2}>
      <Stack
        component={MotionContainer}
        direction="row"
        whileTap="tap"
        whileHover="hover"
        sx={{ cursor: 'pointer' }}
        onClick={onToggle}
      >
        <m.div variants={{ initial: { x: -5, opacity: 0 }, hover: { opacity: 1 } }}>
          <Iconify
            icon={isOpen ? 'eva:chevron-down-fill' : 'eva:chevron-right-fill'}
            color="text.primary"
          />
        </m.div>

        <m.div variants={{ initial: { x: -10 }, hover: { x: -5 }, tap: { x: 0 } }}>
          <Typography variant="overline" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        </m.div>
      </Stack>
    </ContainerDivider>
  )
}
