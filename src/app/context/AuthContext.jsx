'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token')
        if (token) {
            verifyToken(token)
        } else {
            setLoading(false)
        }
    }, [])

    const verifyToken = async (token) => {
        try {
            const response = await fetch('/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
            } else {
                // Token is invalid, remove it
                localStorage.removeItem('token')
                setUser(null)
            }
        } catch (error) {
            console.error('Token verification error:', error)
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)
                setUser(data.user)
                return { success: true, data }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: 'An error occurred during login' }
        }
    }

    const signup = async (name, email, password) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)
                setUser(data.user)
                return { success: true, data }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            console.error('Signup error:', error)
            return { success: false, error: 'An error occurred during signup' }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/')
    }

    const requireAuth = () => {
        if (!user && !loading) {
            router.push('/auth/signin?redirect=/checkout')
            return false
        }
        return true
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                requireAuth,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

