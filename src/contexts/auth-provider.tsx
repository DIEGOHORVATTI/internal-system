import type { IUser } from '@/types/IUser'

import { decodeJwt } from '@/shared/decode-jwt'
import { STORAGE_KEYS } from '@/constants/config'
import React, { useState, useEffect, useCallback, createContext } from 'react'

export type IAuthContext = {
  user: IUser | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null)

  const login = useCallback((token: string) => {
    const decodedUser = decodeJwt<IUser>(token)

    if (decodedUser) {
      setUser(decodedUser)
      localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN)
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.USER_TOKEN)

    if (storedToken) {
      try {
        const decodedUser = decodeJwt<IUser>(storedToken)

        setUser(decodedUser)
      } catch (error) {
        console.error('Invalid token, logging out', error)

        logout()
      }
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
