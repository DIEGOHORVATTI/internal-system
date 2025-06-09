import { lazy } from 'react'
import ThemeProvider from '@/theme'
//import NavBar from '@/layouts/nav-bar'
import { PATHS } from '@/routes/paths'
import AuthGuard from '@/guards/auth-guard'
import { navConfig } from '@/routes/nav-config'
import AuthProvider from '@/contexts/auth-provider'
import extractRoutes from '@/shared/extract-routes'
import SuspenseProvider from '@/components/suspense'
import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MotionLazyProvider from '@/components/animate/motion-lazy-provider'

const PageAuthLogin = lazy(() => import('@/features/auth/pages/login'))

export default function App() {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark',
        themeContrast: 'default',
        themeLayout: 'vertical',
        themeColorPresets: 'warning',
        themeStretch: true,
      }}
    >
      <ThemeProvider>
        <MotionLazyProvider>
          <SnackbarProvider>
            <BrowserRouter>
              <AuthProvider>
                <SuspenseProvider>
                  <AuthGuard>
                    <Routes>
                      <Route path={PATHS.auth.login} element={<PageAuthLogin />} />

                      <Route
                        path="*"
                        element={
                          <>
                            {/* <NavBar navConfig={navConfig}> */}
                            <Routes>
                              {extractRoutes(navConfig).map(({ path, element }) => (
                                <Route key={path} path={path} element={element} />
                              ))}
                            </Routes>
                            {/* </NavBar> */}
                          </>
                        }
                      />
                    </Routes>
                  </AuthGuard>
                </SuspenseProvider>
              </AuthProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </MotionLazyProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}
