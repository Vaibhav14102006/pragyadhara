"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  isAnonymous: boolean
  name?: string
}

interface AuthContextType {
  user: User | null
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const mockUser: User = {
      uid: 'demo-user-123',
      displayName: 'Demo Teacher',
      email: 'demo@teacher.com',
      photoURL: null,
      isAnonymous: false,
      name: 'Demo Teacher'
    }
    
    setUser(mockUser)
    setLoading(false)
  }, [])

  const signOut = async () => {
    setUser(null)
    // In a real app, this would sign out from Firebase/Auth provider
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}