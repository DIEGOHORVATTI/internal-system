import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import AuthProvider from '@/contexts/auth-provider'

import NavBar from '@/layouts/navbar'
import AuthGuard from '@/guards/auth-guard'
import { MotionLazy } from '@/components/animate/motion-lazy'

import { ThemeProvider } from '@/theme'

import { extractRoutes } from '@/shared/extract-routes'
import { navConfig } from '@/routes/nav-config'

export default function App() {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark',
        themeContrast: 'default',
        modeLayout: true,
        themeColorPresets: 'warning',
        themeStretch: false,
      }}
    >
      <ThemeProvider>
        <MotionLazy>
          <SnackbarProvider>
            <AuthProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AuthGuard>
                  <NavBar navConfig={navConfig}>
                    <Routes>
                      {extractRoutes(navConfig).map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                      ))}
                    </Routes>
                  </NavBar>
                </AuthGuard>
              </BrowserRouter>
            </AuthProvider>
          </SnackbarProvider>
        </MotionLazy>
      </ThemeProvider>
    </SettingsProvider>
  )
}
