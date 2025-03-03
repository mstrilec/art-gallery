export interface LoginCredentials {
	username: string
	password: string
}

export interface RegisterCredentials {
	username: string
	password: string
	roles?: string[]
}

export interface User {
	_id: string
	username: string
	roles: string[]
}

export interface AuthResponse {
	access_token: string
}
