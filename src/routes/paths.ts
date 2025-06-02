const ROOTS = {
  AUTH: '/auth',
}

export const PATHS = {
  home: '/',
  users: {
    root: '/users',
    new: '/users/new',
    list: '/users/list',
    profile: (id: string) => `/users/${id}`,
  },
  post: {
    root: '/blog',
    new: '/blog/new',
    list: '/blog/list',
    edit: (id: string) => `/blog/edit/${id}`,
    details: (id: string) => `/blog/${id}`,
  },
  fileManager: {
    root: '/file-manager',
    new: '/file-manager/new',
    list: '/file-manager/list',
    edit: (id: string) => `/file-manager/edit/${id}`,
    details: (id: string) => `/file-manager/${id}`,
  },
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  calendar: '/calendar',
  courses: '/courses',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
}

export const paths = PATHS
