import type { CardProps } from '@mui/material/Card'

import SvgColor from '@/components/svg-color'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export function FileUpgrade({ sx, ...other }: CardProps) {
  return (
    <Card
      sx={[
        (theme) => ({
          p: 5,
          display: 'flex',
          alignItems: 'center',
          color: 'common.white',
          background: `radial-gradient(70% 70% at 0% 0%, ${theme.palette.grey[700]} 0%, ${theme.palette.common.black} 100%)`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component="img"
        alt="Upgrade Illustration"
        src="/assets/illustrations/illustration-upgrade.webp"
        sx={{
          right: 16,
          zIndex: 9,
          width: 120,
          height: 150,
          position: 'absolute',
        }}
      />

      <SvgColor
        src="/assets/background/shape-circle-1.svg"
        sx={{
          zIndex: 8,
          width: 200,
          right: -32,
          height: 200,
          opacity: 0.12,
          position: 'absolute',
        }}
      />

      <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h6" sx={{ maxWidth: 180 }}>
          Upgrade your plan and get more space
        </Typography>

        <Button color="warning" variant="contained">
          Upgrade plan
        </Button>
      </Stack>
    </Card>
  )
}
