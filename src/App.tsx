import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import AuthProvider from '@/contexts/auth-provider'

import AuthGuard from '@/guards/auth-guard'

import Home from '@/sections/Home'
import Auth from '@/sections/Auth'

import NavbarVertical from '@/layouts/navbar-vertical'
import { MotionLazy } from '@/components/animate/motion-lazy'

import { ThemeProvider } from '@/theme'

import { navConfig } from './routes/nav-config'
import { CollapseDrawerProvider } from './contexts/collapse-drawer-context'

export default function App() {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark',
        themeContrast: 'default',
        themeLayout: true,
        themeColorPresets: 'warning',
        themeStretch: false,
      }}
    >
      <ThemeProvider>
        <MotionLazy>
          <CollapseDrawerProvider>
            <SnackbarProvider>
              <AuthProvider>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                  {/* <AuthGuard> */}
                  <NavbarVertical navConfig={navConfig}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth" element={<Auth />} />

                      <Route path="*" element={<Home />} />
                    </Routes>
                  </NavbarVertical>
                  {/* </AuthGuard> */}
                </BrowserRouter>
              </AuthProvider>
            </SnackbarProvider>
          </CollapseDrawerProvider>
        </MotionLazy>
      </ThemeProvider>
    </SettingsProvider>
  )
}
