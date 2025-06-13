import type { usePopover } from 'minimal-shared/hooks'
import type { Path, FieldValues, UseFormReturn, DefaultValues } from 'react-hook-form'

/**
 * Representa a definição de um filtro no sistema de filtros.
 *
 * @template T - Tipo dos valores do formulário controlado pelo React Hook Form.
 */
export type FilterField<T extends FieldValues> = {
  /** Rótulo exibido no menu de filtros. */
  label: string

  /** Usado como chave única. */
  key: string

  /**
   * Lista opcional de campos relacionados a este filtro.
   * Usado para identificar quais campos fazem parte do grupo e verificar se há filtros ativos.
   */
  fields: {
    [K in keyof T]?: string
  }

  /**
   * Função que renderiza os campos do filtro no popover.
   * Recebe as propriedades `label`, `key` e `fields` como parâmetro.
   */
  render: (props: FilterField<T>) => React.ReactNode
}

/**
 * Tipo do contexto de filtros usado para controlar o estado e as ações dos filtros.
 *
 * @template T - Tipo dos valores do formulário controlado pelo React Hook Form.
 */
export type FiltersContextType<T extends FieldValues> = {
  /** Hook de controle do popover dos filtros. */
  popover: ReturnType<typeof usePopover>

  /** Objeto do filtro atualmente selecionado no menu lateral. */
  activeMenu: FilterField<T> | undefined

  /** Chave (name) do filtro atualmente selecionado. */
  key: string

  /** Indica se há algum campo com valor válido no filtro atualmente selecionado. */
  isHasActiveFilter: boolean

  /** Define o filtro ativo a partir de sua chave (name). */
  setActiveMenuKey: (key: string) => void

  /** Métodos do React Hook Form para manipular os dados do formulário de filtros. */
  methods: UseFormReturn<T>

  /** Objeto contendo os valores atuais dos filtros. */
  filters: T

  /** Lista de filtros disponíveis. */
  data: Array<FilterField<T>>

  /** Restaura os filtros para os valores padrões. */
  resetFilters: () => void

  /**
   * Remove um filtro específico (reseta seu valor) e aplica novamente os filtros atualizados.
   *
   * @param key - Nome do campo a ser removido dos filtros.
   */
  handleChipDelete: (key: Path<T>) => void

  /** Aplica os filtros atuais e fecha o popover. */
  onSubmit: () => void
}

/**
 * Propriedades esperadas pelo componente `FiltersProvider`.
 *
 * @template T - Tipo dos valores do formulário controlado pelo React Hook Form.
 */
export type FiltersProps<T extends FieldValues> = Pick<FiltersContextType<T>, 'data'> & {
  /** Valores padrões iniciais dos filtros. */
  defaultValues: DefaultValues<T>

  /**
   * Função chamada quando os filtros são aplicados.
   *
   * @param filters - Objeto com os valores dos filtros aplicados.
   */
  onApply: (filters: T) => void
}
