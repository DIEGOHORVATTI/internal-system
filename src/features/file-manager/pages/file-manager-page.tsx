import Iconify from '@/components/iconify'
import MainContent from '@/layouts/main-content'

import Button from '@mui/material/Button'

export default function FileManagePage() {
  return (
    <MainContent
      slotProps={{
        breadcrumbs: {
          action: (
            <Button variant="contained" startIcon={<Iconify icon="eva:cloud-upload-fill" />}>
              Enviar
            </Button>
          ),
        },
      }}
    >
      <h1 />
    </MainContent>
  )
}
