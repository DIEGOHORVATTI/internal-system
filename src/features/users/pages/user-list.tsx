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
        filterItems={[]}
      />
    </MainContent>
  )
}
