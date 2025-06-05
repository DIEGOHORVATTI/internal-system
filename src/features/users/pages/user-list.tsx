import type { Dayjs } from 'dayjs'

import MainContent from '@/layouts/main-content'

import Filters from '../components/filters'

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
            key: 'dataHorario',
            label: 'Data e Horário',
            render: () => <input type="text" placeholder="Data e Horário" />,
          },
          {
            key: 'midiaChamada',
            label: 'Mídia da Chamada',
            render: () => <input type="text" placeholder="Mídia da Chamada" />,
          },
          {
            key: 'agentes',
            label: 'Agentes',
            render: () => <input type="text" placeholder="Agentes" />,
          },
          {
            key: 'servicos',
            label: 'Serviços',
            render: () => <input type="text" placeholder="Serviços" />,
          },
          {
            key: 'dadosAssociados',
            label: 'Dados Associados',
            render: () => <input type="text" placeholder="Dados Associados" />,
          },
          {
            key: 'condicaoTermino',
            label: 'Condição de Término',
            render: () => <input type="text" placeholder="Condição de Término" />,
          },
          {
            key: 'intervaloDuracao',
            label: 'Intervalo de Duração',
            render: () => <input type="text" placeholder="Intervalo de Duração" />,
          },
          {
            key: 'interlocutor',
            label: 'Interlocutor',
            render: () => <input type="text" placeholder="Interlocutor" />,
          },
          {
            key: 'gravacao',
            label: 'Gravação',
            render: () => <input type="text" placeholder="Gravação" />,
          },
          {
            key: 'protocolo',
            label: 'Protocolo',
            render: () => <input type="text" placeholder="Protocolo" />,
          },
          {
            key: 'causaSIP',
            label: 'Causa SIP',
            render: () => <input type="text" placeholder="Causa SIP" />,
          },
        ]}
      />
    </MainContent>
  )
}
