import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import AuthProvider from '@/contexts/auth-provider'

import AuthGuard from '@/guards/auth-guard'

import Home from '@/sections/Home'
import Auth from '@/sections/Auth'

import { ThemeProvider } from '@/theme'
import DashboardLayout from './layouts'

export default function App() {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'dark',
        themeContrast: 'default',
        themeLayout: 'vertical',
        themeColorPresets: 'pink',
        themeStretch: false,
      }}
    >
      <ThemeProvider>
        <SnackbarProvider>
          <AuthProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AuthGuard>
                <DashboardLayout
                  links={[
                    {
                      name: 'teste',
                      href: '/teste',
                    },
                  ]}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />

                    <Route path="*" element={<Home />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            </BrowserRouter>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}
