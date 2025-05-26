import { Suspense } from 'react'
import NavBar from '@/layouts/navbar'
import { ThemeProvider } from '@/theme'
import AuthGuard from '@/guards/auth-guard'
import { navConfig } from '@/routes/nav-config'
import AuthProvider from '@/contexts/auth-provider'
import { extractRoutes } from '@/shared/extract-routes'
import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MotionLazyProvider from '@/components/animate/motion-lazy-provider'

import SplashScreen from './components/splash-screen'

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
        <MotionLazyProvider>
          <SnackbarProvider>
            <AuthProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Suspense fallback={<SplashScreen />}>
                  <AuthGuard>
                    <NavBar navConfig={navConfig}>
                      <Routes>
                        {extractRoutes(navConfig).map(({ path, element }) => (
                          <Route key={path} path={path} element={element} />
                        ))}
                      </Routes>
                    </NavBar>
                  </AuthGuard>
                </Suspense>
              </BrowserRouter>
            </AuthProvider>
          </SnackbarProvider>
        </MotionLazyProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}
