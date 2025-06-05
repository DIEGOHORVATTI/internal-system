import type { BoxProps } from '@mui/material/Box'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { FormProvider as Form } from 'react-hook-form'

import Box from '@mui/material/Box'

type FormProviderProps<T extends FieldValues> = BoxProps & {
  children: React.ReactNode
  methods: UseFormReturn<T, unknown, T>
  onSubmit?: VoidFunction
}

export default function FormProvider<T extends FieldValues>({
  children,
  methods,
  ...props
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <Box component="form" encType="multipart/form-data" height={1} width={1} {...props}>
        {children}
      </Box>
    </Form>
  )
}
