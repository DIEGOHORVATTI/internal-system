import { PATH_DASHBOARD } from '@/routes/paths'

import { Iconify } from '@/components'

export const navConfig = [
  {
    subheader: 'Dashboards',
    items: [
      {
        title: PATH_DASHBOARD.general.reportUTM.name,
        path: PATH_DASHBOARD.general.reportUTM.path,
        icon: (
          <Iconify
            icon="eva:file-text-fill"
            sx={{
              transform: 'scale(1.3)'
            }}
          />
        )
      }
    ]
  },
  {
    subheader: 'Configurações',
    items: [
      {
        title: PATH_DASHBOARD.general.projects.name,
        path: PATH_DASHBOARD.general.projects.path,
        icon: <Iconify icon="fontisto:database" />
      },
      {
        title: PATH_DASHBOARD.general.domains.name,
        path: PATH_DASHBOARD.general.domains.path,
        icon: (
          <Iconify
            icon="jam:world"
            sx={{
              transform: 'scale(1.4)'
            }}
          />
        )
      },
      {
        title: PATH_DASHBOARD.general.Integrations.name,
        path: PATH_DASHBOARD.general.Integrations.path,
        icon: <Iconify icon="dashicons:admin-plugins" />
      },
      {
        title: PATH_DASHBOARD.general.launches.name,
        path: PATH_DASHBOARD.general.launches.path,
        icon: (
          <Iconify
            icon="simple-line-icons:graph"
            sx={{
              transform: 'scale(1.4)'
            }}
          />
        )
      },
      /* {
        title: PATH_DASHBOARD.general.reports.name,
        path: PATH_DASHBOARD.general.reports.path,
        icon: (
          <Iconify
            icon="mdi:file-chart-outline"
            sx={{
              transform: 'scale(1.4)'
            }}
          />
        )
      }, */
      {
        title: PATH_DASHBOARD.general.whatsapp.name,
        path: PATH_DASHBOARD.general.whatsapp.path,
        icon: (
          <Iconify
            icon="bx:bxl-whatsapp"
            sx={{
              transform: 'scale(1.4)'
            }}
          />
        )
      }
    ]
  }
]
