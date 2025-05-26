import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import AuthProvider from '@/contexts/auth-provider'

import AuthGuard from '@/guards/auth-guard'

const Page404 = lazy(() => import('@/pages/404'))

import NavBar from '@/layouts/navbar'
import { MotionLazy } from '@/components/animate/motion-lazy'

import { ThemeProvider } from '@/theme'

import { extractRoutes } from '@/shared/extract-routes'
import { navConfig } from '@/routes/nav-config'

export default function App() {
  const newLocal = extractRoutes(navConfig)

  console.log(newLocal)

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
                {/* <AuthGuard> */}
                <NavBar navConfig={navConfig}>
                  <Routes>
                    {newLocal.map(({ path, component }) => (
                      <Route key={path} path={path} element={component} />
                    ))}

                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </NavBar>
                {/* </AuthGuard> */}
              </BrowserRouter>
            </AuthProvider>
          </SnackbarProvider>
        </MotionLazy>
      </ThemeProvider>
    </SettingsProvider>
  )
}
