import type { Dayjs } from 'dayjs'

export type InteractionRecord = {
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
