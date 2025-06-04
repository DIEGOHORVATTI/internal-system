import type { BoxProps } from '@mui/material/Box'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { FormProvider as Form } from 'react-hook-form'

type Props<T extends FieldValues> = BoxProps & {
  methods: UseFormReturn<T, any, T>
  onSubmit?: VoidFunction
}

export default function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: Props<T>) {
  return (
    <Form {...methods}>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
