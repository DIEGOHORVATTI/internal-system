import type { IUser } from '@/types/IUser'

import { decodeJwt } from '@/shared/decode-jwt'
import { STORAGE_KEYS } from '@/constants/config'
import { useMemo, useCallback, createContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

export type IAuthContext = {
  user: IUser | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as IAuthContext)

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string) => {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : null
}

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const {
    state: user,
    update,
    remove,
  } = useLocalStorage<IUser | null>(STORAGE_KEYS.USER_TOKEN, null)

  useEffect(() => {
    const token = getCookie('auth_token')
    if (token && !user) {
      const decodedUser = decodeJwt<IUser>(token)
      if (decodedUser) {
        update(decodedUser)
      }
    }
  }, [update, user])

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      // Header e payload simulados
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const payload = btoa(
        JSON.stringify({
          id: '1',
          email,
          name: 'John Doe',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      )
      const signature = 'mocked_signature'

      const mockToken = `${header}.${payload}.${signature}`

      const decodedUser = decodeJwt<IUser>(mockToken)

      if (!decodedUser) throw new Error('Invalid token')

      // Set cookie with token (7 days expiration)
      setCookie('auth_token', mockToken, 7)
      update(decodedUser)
    },
    [update]
  )

  const logout = useCallback(() => {
    removeCookie('auth_token')
    remove()
  }, [remove])

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}