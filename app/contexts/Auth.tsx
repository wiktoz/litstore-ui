'use client'

import React, { createContext, useContext } from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter, usePathname } from 'next/navigation'
import api, { AuthError, fetcher } from '../utils/api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: any
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: user, error, isLoading } = useSWR<User>('/users/me', fetcher, {
        refreshInterval: 1 * 30 * 1000,
        revalidateOnFocus: true
    })

    const login = async (email: string, password: string) => {
        await api.post('/auth/login', { email, password })
        await mutate('/users/me') // re-fetch user
    }

    const logout = async () => {
        await api.post('/auth/logout')
        await mutate('/users/me', null, false) // set to null without re-fetch
    }

    const refreshUser = async () => {
        await mutate('/users/me')
    }

    return (
        <AuthContext.Provider value={{ user: user || null, loading: isLoading, error: error, login, logout, refreshUser }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}

export function useAuthRedirect(redirectTo = "/pl/auth/sign-in") {
    const { user, loading, error } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && (!user || error instanceof AuthError)) {
            router.push(redirectTo)
        }
    }, [user, loading, error, pathname, redirectTo, router])
}
