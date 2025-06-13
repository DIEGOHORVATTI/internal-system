import MainContent from '@/layouts/main-content'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import RHFDateField from '@/components/hook-form/rhf-date-field'

import { Stack } from '@mui/material'
import Button from '@mui/material/Button'

import * as Filters from '../components/filters'
import useFilters from '../components/filters/hooks/use-filters'

type InteractionRecord = {
  startDate: Date | null
  endDate: Date | null
  name: string
  age: number
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

const defaultValues: InteractionRecord = {
  name: '',
  age: 0,
  startDate: null,
  endDate: null,
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

export default function UserList() {
  return (
    <Filters.FiltersProvider<InteractionRecord>
      defaultValues={defaultValues}
      onApply={(filters) => {
        console.log('Filtros aplicados:', filters)
      }}
      data={[
        {
          name: 'startDate',
          label: 'Data de Início',
          fields: ['startDate', 'endDate', 'name', 'age'],
          render: () => (
            <Stack spacing={2}>
              <RHFDateField<InteractionRecord> label="Data de Início" name="startDate" />

              <RHFDateField<InteractionRecord> label="Data de Término" name="endDate" />

              <RHFTextField<InteractionRecord> fullWidth label="Data e Nome" name="name" />

              <RHFTextField<InteractionRecord> fullWidth label="Idade" name="age" />
            </Stack>
          ),
        },
        {
          name: 'midiaChamada',
          label: 'Mídia da Chamada',
          render: () => (
            <RHFTextField<InteractionRecord>
              fullWidth
              name="midiaChamada"
              label="Mídia da Chamada"
            />
          ),
        },
        {
          name: 'agentes',
          label: 'Agentes',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="agentes" label="Agentes" />
          ),
        },
        {
          name: 'servicos',
          label: 'Serviços',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="servicos" label="Serviços" />
          ),
        },
        {
          name: 'dadosAssociados',
          label: 'Dados Associados',
          render: () => (
            <RHFTextField<InteractionRecord>
              fullWidth
              name="dadosAssociados"
              label="Dados Associados"
            />
          ),
        },
        {
          name: 'condicaoTermino',
          label: 'Condição de Término',
          render: () => (
            <RHFTextField<InteractionRecord>
              fullWidth
              name="condicaoTermino"
              label="Condição de Término"
            />
          ),
        },
        {
          name: 'intervaloDuracao',
          label: 'Intervalo de Duração',
          render: () => (
            <RHFTextField<InteractionRecord>
              fullWidth
              name="intervaloDuracao"
              label="Intervalo de Duração"
            />
          ),
        },
        {
          name: 'interlocutor',
          label: 'Interlocutor',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="interlocutor" label="Interlocutor" />
          ),
        },
        {
          name: 'gravacao',
          label: 'Gravação',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="gravacao" label="Gravação" />
          ),
        },
        {
          name: 'protocolo',
          label: 'Protocolo',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="protocolo" label="Protocolo" />
          ),
        },
        {
          name: 'causaSIP',
          label: 'Causa SIP',
          render: () => (
            <RHFTextField<InteractionRecord> fullWidth name="causaSIP" label="Causa SIP" />
          ),
        },
      ]}
    >
      <List />
    </Filters.FiltersProvider>
  )
}

function List() {
  const { popover } = useFilters<InteractionRecord>()

  return (
    <MainContent>
      <Button variant="contained" color="secondary" onClick={popover.onOpen} sx={{ width: 100 }}>
        Filtrar
      </Button>

      {/* <Filters.Chips<InteractionRecord> /> */}
    </MainContent>
  )
}
