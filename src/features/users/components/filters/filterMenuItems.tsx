import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import type { InteractionRecord } from './types'

export type MenuItems = {
  label: string
  key: keyof InteractionRecord
  render: () => React.ReactNode
}

export function getMenuItems(control: any): Array<MenuItems> {
  return [
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
}
