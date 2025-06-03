import type { Dayjs } from 'dayjs'

import { useState } from 'react'
import Iconify from '@/components/iconify'
import { usePopover } from 'minimal-shared/hooks'
import { useForm, Controller } from 'react-hook-form'
import CustomPopover from '@/components/custom-popover'

import { DatePicker } from '@mui/x-date-pickers'
import {
  Box,
  List,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material'

type InteractionRecord = {
  dataHorario: Dayjs | null
  midiaChamada: string
  agentes: string
  servicos: string
  dadosAssociados: string
  condicaoTermino: string
  intervaloDuracao: string
  interlocutor: string
  gravacao: string
  protocolo: string
  causaSIP: string
}

type MenuItems = {
  label: string
  key: keyof InteractionRecord
  render: () => React.ReactNode
}

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

  const menuItems: Array<MenuItems> = [
    {
      label: 'Data e horário',
      key: 'dataHorario',
      render: () => (
        <Controller
          name="dataHorario"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Selecione uma data"
              slotProps={{ textField: { fullWidth: true } }}
            />
          )}
        />
      ),
    },
    {
      label: 'Mídia e chamada',
      key: 'midiaChamada',
      render: () => (
        <Controller
          name="midiaChamada"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Digite a mídia ou chamada" fullWidth />
          )}
        />
      ),
    },
    {
      label: 'Agentes',
      key: 'agentes',
      render: () => (
        <Controller
          name="agentes"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Digite o nome do agente" fullWidth />}
        />
      ),
    },
    {
      label: 'Serviços',
      key: 'servicos',
      render: () => (
        <Controller
          name="servicos"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Digite o serviço" fullWidth />}
        />
      ),
    },
    {
      label: 'Dados associados',
      key: 'dadosAssociados',
      render: () => (
        <Controller
          name="dadosAssociados"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Digite os dados associados" fullWidth />
          )}
        />
      ),
    },
    {
      label: 'Condição de término',
      key: 'condicaoTermino',
      render: () => (
        <Controller
          name="condicaoTermino"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Digite a condição de término" fullWidth />
          )}
        />
      ),
    },
    {
      label: 'Intervalo de duração',
      key: 'intervaloDuracao',
      render: () => (
        <Controller
          name="intervaloDuracao"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Digite o intervalo de duração" fullWidth />
          )}
        />
      ),
    },
    {
      label: 'Interlocutor',
      key: 'interlocutor',
      render: () => (
        <Controller
          name="interlocutor"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Digite o nome do interlocutor" fullWidth />
          )}
        />
      ),
    },
    {
      label: 'Gravação',
      key: 'gravacao',
      render: () => (
        <Controller
          name="gravacao"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Digite a gravação" fullWidth />}
        />
      ),
    },
    {
      label: 'Protocolo',
      key: 'protocolo',
      render: () => (
        <Controller
          name="protocolo"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Digite o protocolo" fullWidth />}
        />
      ),
    },
    {
      label: 'Causa SIP',
      key: 'causaSIP',
      render: () => (
        <Controller
          name="causaSIP"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Digite a causa SIP" fullWidth />}
        />
      ),
    },
  ]

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
