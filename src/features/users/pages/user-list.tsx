import MainContent from '@/layouts/main-content'
import RHFTextField from '@/components/hook-form/rhf-text-field'

import { Stack } from '@mui/material'
import Button from '@mui/material/Button'

import * as Filters from '../components/filters'
import useFilters from '../components/filters/hooks/use-filters'

type InteractionRecord = {
  dataHorario: string | null
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
  dataHorario: '',
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
          name: 'dataHorario',
          label: 'Data e Horário',
          render: (props) => (
            <Stack spacing={2}>
              <RHFTextField<InteractionRecord> fullWidth {...props} />

              <RHFTextField<InteractionRecord> fullWidth label="Data e Nome" name="name" />

              <RHFTextField<InteractionRecord> fullWidth label="Idade" name="age" />
            </Stack>
          ),
        },
        {
          name: 'midiaChamada',
          label: 'Mídia da Chamada',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'agentes',
          label: 'Agentes',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'servicos',
          label: 'Serviços',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'dadosAssociados',
          label: 'Dados Associados',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'condicaoTermino',
          label: 'Condição de Término',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'intervaloDuracao',
          label: 'Intervalo de Duração',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'interlocutor',
          label: 'Interlocutor',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'gravacao',
          label: 'Gravação',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'protocolo',
          label: 'Protocolo',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
        },
        {
          name: 'causaSIP',
          label: 'Causa SIP',
          render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
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
