import axios from 'axios'
import {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
	User,
} from '../types/auth'

const API_URL = 'http://localhost:3000'
const AUTH_ENDPOINT = `${API_URL}/auth`

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

export const authService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await axios.post<AuthResponse>(
			`${AUTH_ENDPOINT}/login`,
			credentials
		)
		localStorage.setItem('token', response.data.access_token)
		return response.data
	},

	async register(credentials: RegisterCredentials): Promise<User> {
		const response = await axios.post<User>(
			`${AUTH_ENDPOINT}/register`,
			credentials
		)
		return response.data
	},

	async getProfile(): Promise<User> {
		const response = await axios.get<User>(`${AUTH_ENDPOINT}/profile`)
		return response.data
	},

	async getAdminProfile(): Promise<User> {
		const response = await axios.get<User>(`${AUTH_ENDPOINT}/admin-profile`)
		return response.data
	},

	logout(): void {
		localStorage.removeItem('token')
	},

	isAuthenticated(): boolean {
		return !!localStorage.getItem('token')
	},
}
