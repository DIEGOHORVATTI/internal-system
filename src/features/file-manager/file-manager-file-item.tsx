import type { IFileManager } from '@/types/file'
import type { CardProps } from '@mui/material/Card'

import Iconify from '@/components/iconify'
import { enqueueSnackbar } from 'notistack'
import { useState, useCallback } from 'react'
import { fData } from '@/utils/format-number'
import { fDateTime } from '@/utils/format-time'
import ConfirmDialog from '@/components/custom-dialog'
import CustomPopover from '@/components/custom-popover'
import FileThumbnail from '@/components/file-thumbnail'
import { useBoolean, usePopover, useCopyToClipboard } from 'minimal-shared/hooks'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup'

import { FileManagerShareDialog } from './file-manager-share-dialog'
import { FileManagerFileDetails } from './file-manager-file-details'

type Props = CardProps & {
  selected?: boolean
  file: IFileManager
  onDelete: () => void
  onSelect?: () => void
}

export function FileManagerFileItem({ file, selected, onSelect, onDelete, sx, ...other }: Props) {
  const shareDialog = useBoolean()
  const confirmDialog = useBoolean()
  const detailsDrawer = useBoolean()
  const menuActions = usePopover()

  const checkbox = useBoolean()
  const favorite = useBoolean(file.isFavorited)

  const { copy } = useCopyToClipboard()

  const [inviteEmail, setInviteEmail] = useState('')

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value)
  }, [])

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Link copied to clipboard', {
      variant: 'success',
    })
    copy(file.url)
  }, [copy, file.url])

  const renderIcon = () => (
    <Box
      onMouseEnter={checkbox.onTrue}
      onMouseLeave={checkbox.onFalse}
      sx={{ display: 'inline-flex', width: 36, height: 36 }}
    >
      {(checkbox.value || selected) && onSelect ? (
        <Checkbox
          checked={selected}
          onClick={onSelect}
          icon={<Iconify icon="eva:radio-button-off-fill" />}
          checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          inputProps={{ id: `${file.id}-checkbox`, 'aria-label': `${file.id} checkbox` }}
          sx={{ width: 1, height: 1 }}
        />
      ) : (
        <FileThumbnail file={file.type} sx={{ width: 1, height: 1 }} />
      )}
    </Box>
  )

  const renderActions = () => (
    <Box
      sx={{
        top: 8,
        right: 8,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorite.value}
        onChange={favorite.onToggle}
        inputProps={{
          id: `favorite-${file.id}-checkbox`,
          'aria-label': `Favorite ${file.id} checkbox`,
        }}
      />

      <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Box>
  )

  const renderText = () => (
    <>
      <Typography
        variant="subtitle2"
        onClick={detailsDrawer.onTrue}
        sx={(theme) => ({
          mt: 2,
          mb: 0.5,
          width: 1,
        })}
      >
        {file.name}
      </Typography>

      <Box
        sx={{
          maxWidth: 0.99,
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        {fData(file.size)}

        <Box
          component="span"
          sx={{
            mx: 0.75,
            width: 2,
            height: 2,
            flexShrink: 0,
            borderRadius: '50%',
            bgcolor: 'currentColor',
          }}
        />
        <Typography noWrap component="span" variant="caption">
          {fDateTime(file.modifiedAt)}
        </Typography>
      </Box>
    </>
  )

  const renderAvatar = () => (
    <AvatarGroup
      max={3}
      sx={{
        mt: 1,
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          '&:first-of-type': { fontSize: 12 },
        },
      }}
    >
      {file.shared?.map((person) => (
        <Avatar key={person.id} alt={person.name} src={person.avatarUrl} />
      ))}
    </AvatarGroup>
  )

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      shared={file.shared}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onCopyLink={handleCopy}
      onClose={() => {
        shareDialog.onFalse()
        setInviteEmail('')
      }}
    />
  )

  const renderFileDetailsDrawer = () => (
    <FileManagerFileDetails
      file={file}
      favorited={favorite.value}
      onFavorite={favorite.onToggle}
      onCopyLink={handleCopy}
      open={detailsDrawer.value}
      onClose={detailsDrawer.onFalse}
      onDelete={() => {
        detailsDrawer.onFalse()
        onDelete()
      }}
    />
  )

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      arrow="right-top"
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose()
            handleCopy()
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose()
            shareDialog.onTrue()
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue()
            menuActions.onClose()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  )

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      }
    />
  )

  return (
    <>
      <Paper
        variant="outlined"
        sx={[
          (theme) => ({
            p: 2.5,
            display: 'flex',
            borderRadius: 2,
            cursor: 'pointer',
            position: 'relative',
            bgcolor: 'transparent',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ...((checkbox.value || selected) && {
              bgcolor: 'background.paper',
              boxShadow: theme.customShadows.z20,
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {renderIcon()}
        {renderText()}
        {renderAvatar()}
        {renderActions()}
      </Paper>

      {renderShareDialog()}
      {renderFileDetailsDrawer()}

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  )
}
