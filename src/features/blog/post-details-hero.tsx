import type { IPostHero } from '@/types/blog'
import type { BoxProps } from '@mui/material/Box'

import { _socials } from '@/_mock'
import Iconify from '@/components/iconify'
import { fDate } from '@/utils/format-time'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import SpeedDial from '@mui/material/SpeedDial'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import SpeedDialAction from '@mui/material/SpeedDialAction'

export function PostDetailsHero({
  sx,
  title,
  author,
  coverUrl,
  createdAt,
  ...other
}: BoxProps & IPostHero) {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box
      /* sx={[
        {
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(
                theme.palette.grey['900Channel'],
                0.64
              )}, ${varAlpha(theme.palette.grey['900Channel'], 0.64)})`,
              `url(${coverUrl})`,
            ],
          }),
          height: 480,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]} */
      {...other}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            maxWidth: 480,
            position: 'absolute',
            pt: { xs: 2, md: 8 },
            color: 'common.white',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {author && createdAt && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, md: 3 },
                pb: { xs: 3, md: 8 },
              }}
            >
              <Avatar
                alt={author.name}
                src={author.avatarUrl}
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              <ListItemText
                sx={{ color: 'common.white' }}
                primary={author.name}
                secondary={fDate(createdAt)}
                slotProps={{
                  primary: { sx: { typography: 'subtitle1' } },
                  secondary: { sx: { mt: 0.5, opacity: 0.64, color: 'inherit' } },
                }}
              />
            </Box>
          )}

          <SpeedDial
            direction={smUp ? 'left' : 'up'}
            ariaLabel="Share post"
            icon={<Iconify icon="solar:share-bold" />}
            FabProps={{ size: 'medium' }}
            sx={{ position: 'absolute', bottom: { xs: 32, md: 64 }, right: { xs: 16, md: 24 } }}
          >
            {_socials.map((social) => (
              <SpeedDialAction
                key={social.label}
                icon={
                  <>
                    {social.value === 'facebook' && <Iconify icon="solar:facebook-bold" />}
                    {social.value === 'instagram' && <Iconify icon="solar:instagram-bold" />}
                    {social.value === 'linkedin' && <Iconify icon="solar:linkedin-bold" />}
                    {social.value === 'twitter' && <Iconify icon="solar:twitter-bold" />}
                  </>
                }
                tooltipPlacement="top"
                FabProps={{ color: 'default' }}
                tooltipTitle={social.label}
              />
            ))}
          </SpeedDial>
        </Box>
      </Container>
    </Box>
  )
}
