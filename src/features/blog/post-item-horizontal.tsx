import type { IPostItem } from '@/types/blog'
import type { CardProps } from '@mui/material/Card'

import Label from '@/components/label'
import Image from '@/components/image'
import Iconify from '@/components/iconify'
import { fDate } from '@/utils/format-time'
import { usePopover } from 'minimal-shared/hooks'
import { fShortenNumber } from '@/utils/format-number'
import CustomPopover from '@/components/custom-popover'
import RouterLink from '@/routes/components/router-link'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

type Props = CardProps & {
  post: IPostItem
  editHref: string
  detailsHref: string
}

export function PostItemHorizontal({ sx, post, editHref, detailsHref, ...other }: Props) {
  const menuActions = usePopover()

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      arrow="bottom-center"
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={detailsHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </li>

        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem onClick={() => menuActions.onClose()} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  )

  return (
    <>
      <Card sx={[{ display: 'flex' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        <Stack
          spacing={1}
          sx={[
            (theme) => ({
              flexGrow: 1,
              p: theme.spacing(3, 3, 2, 3),
            }),
          ]}
        >
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Label variant="soft" color={(post.publish === 'published' && 'info') || 'default'}>
              {post.publish}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(post.createdAt)}
            </Box>
          </Box>

          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} href={detailsHref} color="inherit" variant="subtitle2">
              {post.title}
            </Link>

            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color={menuActions.open ? 'inherit' : 'default'}
              onClick={menuActions.onOpen}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Box
              sx={{
                gap: 1.5,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                typography: 'caption',
                color: 'text.disabled',
                justifyContent: 'flex-end',
              }}
            >
              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:message-circle-fill" width={16} />
                {fShortenNumber(post.totalComments)}
              </Box>

              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:eye-bold" width={16} />
                {fShortenNumber(post.totalViews)}
              </Box>

              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:share-bold" width={16} />
                {fShortenNumber(post.totalShares)}
              </Box>
            </Box>
          </Box>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: 240,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Avatar
            alt={post.author.name}
            src={post.author.avatarUrl}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
            }}
          />
          <Image alt={post.title} src={post.coverUrl} sx={{ height: 1, borderRadius: 1.5 }} />
        </Box>
      </Card>

      {renderMenuActions()}
    </>
  )
}
