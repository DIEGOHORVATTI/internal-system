import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconify from '@/components/iconify'
import { usePopover } from 'minimal-shared/hooks'
import CustomPopover from '@/components/custom-popover'

import {
  Box,
  List,
  Stack,
  Button,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material'

import { getMenuItems } from './filterMenuItems'

import type { InteractionRecord } from './types'

export default function Filters() {
  const popover = usePopover()

  const defaultValues: InteractionRecord = {
    dataHorario: null,
    midiaChamada: '',
    agentes: '',
    servicos: '',
    dadosAssociados: '',
    condicaoTermino: '',
    intervaloDuracao: '',
    interlocutor: '',
    gravacao: '',
    protocolo: '',
    causaSIP: '',
  }

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [filters, setFilters] = useState<InteractionRecord>(defaultValues)
  const { control, handleSubmit } = useForm<InteractionRecord>({
    defaultValues,
  })

  const onSubmit = (data: InteractionRecord) => {
    console.log('Filtros aplicados:', data)
    setFilters(data)
    popover.onClose()
  }

  const menuItems = getMenuItems(control)

  const renderInput = () => {
    const current = menuItems.find((m) => m.label === selectedMenu)
    return current?.render() ?? <Typography>Selecione uma opção para buscar</Typography>
  }

  const menuItemList = (
    <List sx={{ flex: 1, maxHeight: 400, overflowY: 'auto' }}>
      {menuItems.map(({ label, key }) => (
        <Stack
          key={label}
          component={ListItemButton}
          selected={selectedMenu === label}
          direction="row"
          justifyContent="space-between"
          m={1}
          p={1}
          borderRadius={1}
          sx={{
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: (theme) => theme.palette.action.selected,
              borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
            },
          }}
          onClick={() => setSelectedMenu(label)}
        >
          <ListItemText
            primary={
              <>
                {label}
                {!!filters[key] && <Iconify icon="mdi:check" />}
              </>
            }
          />
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </Stack>
      ))}
    </List>
  )

  const controlsPainel = (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <Button color="error" variant="soft" onClick={popover.onClose}>
        Limpar
      </Button>
      <Stack direction="row" spacing={2}>
        <Button color="error" variant="outlined" onClick={popover.onClose}>
          Fechar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Aplicar
        </Button>
      </Stack>
    </Stack>
  )

  return (
    <>
      <Button variant="contained" color="secondary" onClick={popover.onOpen} sx={{ width: 100 }}>
        Filtrar
      </Button>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        arrow="top-left"
        slotProps={{ paper: { sx: { p: 0, width: 600 } } }}
      >
        <Stack width={1} divider={<Divider orientation="horizontal" />}>
          <Stack direction="row" divider={<Divider flexItem orientation="vertical" />}>
            {menuItemList}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} p={2} flex={2}>
              {renderInput()}
            </Box>
          </Stack>
          {controlsPainel}
        </Stack>
      </CustomPopover>
    </>
  )
}
