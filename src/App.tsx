import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar-provider'
import SettingsProvider from '@/contexts/settings-provider'
import AuthProvider from '@/contexts/auth-provider'

import AuthGuard from '@/guards/auth-guard'

import Home from '@/sections/Home'
import Auth from '@/sections/Auth'

import { ThemeProvider } from '@/theme'

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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />

                  <Route path="*" element={<Home />} />
                </Routes>
              </AuthGuard>
            </BrowserRouter>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}
