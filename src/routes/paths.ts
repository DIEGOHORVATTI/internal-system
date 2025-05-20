const path = (root: string, sublink: string) => {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/projects'

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
  resetPassword: {
    root: path(ROOTS_AUTH, '/reset-password'),
  },
  root: ROOTS_AUTH,
}

export const PATH_PAGE = {
  about: '/about-us',
  page404: '/404',
  page500: '/500',
  faqs: '/faqs',
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    projects: {
      name: 'Projetos',
      path: '/projects',
    },
    Integrations: {
      name: 'Integrações',
      path: '/integrations',
    },
    reportUTM: {
      name: 'Relatório UTM',
      path: '/report-utm',
    },
    domains: {
      name: 'Domínios',
      path: '/domains',
    },
    extensao: {
      name: 'Wordpress',
      path: '/extension',
    },
    whatsapp: {
      name: 'Whatsapp',
      path: '/whatsapp',
    },
    launches: {
      name: 'Lançamentos',
      path: '/launches',
    },
    activeCampaign: {
      name: 'Active Campaign',
      path: '/activeCampaign',
    },
    notifications: {
      name: 'Avisos',
      path: '/notifications',
    },
    reports: {
      name: 'Relatorio',
      path: '/reports',
    },
  },
}
