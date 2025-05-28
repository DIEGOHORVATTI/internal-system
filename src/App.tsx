import { lazy } from 'react'
import { ROUTES } from '@/routes'
import ThemeProvider from '@/theme'
import NavBar from '@/layouts/navbar'
import AuthGuard from '@/guards/auth-guard'
import { navConfig } from '@/routes/nav-config'
import AuthProvider from '@/contexts/auth-provider'
import extractRoutes from '@/shared/extract-routes'
import SuspenseProvider from '@/components/suspense'
import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MotionLazyProvider from '@/components/animate/motion-lazy-provider'

const PageAuthLogin = lazy(() => import('@/pages/auth/login'))

export default function App() {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark',
        themeContrast: 'default',
        themeLayout: 'vertical',
        themeColorPresets: 'warning',
        themeStretch: false,
      }}
    >
      <ThemeProvider>
        <MotionLazyProvider>
          <SnackbarProvider>
            <AuthProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SuspenseProvider>
                  <AuthGuard>
                    <Routes>
                      <Route path={ROUTES.auth.login} element={<PageAuthLogin />} />

                      <Route
                        path="*"
                        element={
                          <NavBar navConfig={navConfig}>
                            <Routes>
                              {extractRoutes(navConfig).map(({ path, element }) => (
                                <Route key={path} path={path} element={element} />
                              ))}
                            </Routes>
                          </NavBar>
                        }
                      />
                    </Routes>
                  </AuthGuard>
                </SuspenseProvider>
              </BrowserRouter>
            </AuthProvider>
          </SnackbarProvider>
        </MotionLazyProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}
