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
          key: 'startDate',
          label: 'Data de Início',
          fields: {
            startDate: 'Data de Início',
            endDate: 'Data de Término',
            name: 'Data e Nome',
            age: 'Idade',
          },
          render: () => (
            <Stack spacing={2}>
              <RHFDateField<InteractionRecord> label="Data de Início" name="startDate" />

              <RHFDateField<InteractionRecord> label="Data de Término" name="endDate" />

              <RHFTextField<InteractionRecord> fullWidth label="Data e Nome" name="name" />

              <RHFTextField<InteractionRecord> fullWidth label="Idade" name="age" />
            </Stack>
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

      <Filters.Chips<InteractionRecord> />
    </MainContent>
  )
}
