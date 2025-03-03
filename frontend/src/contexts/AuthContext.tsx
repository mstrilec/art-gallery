import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/auth'
import { User } from '../types/auth'

interface AuthContextType {
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	isAdmin: boolean
	login: (username: string, password: string) => Promise<void>
	register: (username: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (authService.isAuthenticated()) {
					const userData = await authService.getProfile()
					setUser(userData)
				}
			} catch (error) {
				console.error('Failed to fetch user profile:', error)
				authService.logout()
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	const login = async (username: string, password: string) => {
		setIsLoading(true)
		try {
			await authService.login({ username, password })
			const userData = await authService.getProfile()
			setUser(userData)
		} finally {
			setIsLoading(false)
		}
	}

	const register = async (username: string, password: string) => {
		setIsLoading(true)
		try {
			await authService.register({ username, password })
		} finally {
			setIsLoading(false)
		}
	}

	const logout = () => {
		authService.logout()
		setUser(null)
	}

	const isAuthenticated = authService.isAuthenticated()
	const isAdmin = user?.roles?.includes('admin') || false

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated,
				isAdmin,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
