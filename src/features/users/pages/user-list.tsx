import MainContent from '@/layouts/main-content'
import RHFTextField from '@/components/hook-form/rhf-text-field'

import Filters from '../components/filters'

type InteractionRecord = {
  dataHorario: string | null
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
  const handleApply = (filters: InteractionRecord) => {
    console.log('Filtros aplicados:', filters)
  }

  return (
    <MainContent>
      <Filters<InteractionRecord>
        defaultValues={defaultValues}
        onApply={handleApply}
        data={[
          {
            name: 'dataHorario',
            label: 'Data e Horário',
            render: (props) => <RHFTextField<InteractionRecord> fullWidth {...props} />,
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
      />
    </MainContent>
  )
}
