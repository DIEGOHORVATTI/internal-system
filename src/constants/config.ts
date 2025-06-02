import type { Breakpoint } from '@mui/system'

import { version } from '../../package.json'

export const NAVBAR = {
  DASHBOARD_WIDTH: 330,
  DASHBOARD_COLLAPSE_WIDTH: 88,
}

export const LOCAL_STORAGE = {
  SETTINGS: '@azeplast-settings',
  USER_TOKEN: '@azeplast-user',
}

export const VERSION = version

export const API_SERVER_URL = process.env.API_SERVER_URL || 'http://localhost:3000'

export const BREAKPOINT_MOBILE: Breakpoint = 'sm'
