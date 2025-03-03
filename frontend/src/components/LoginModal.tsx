import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.tsx'

interface LoginModalProps {
	isOpen: boolean
	onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const { login } = useAuth()

	if (!isOpen) return null

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setIsLoading(true)

		try {
			await login(username, password)
			onClose()
		} catch (err: any) {
			console.error('Login error:', err)
			setError(err.response?.data?.message || 'Помилка авторизації')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold'>Вхід</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700'
					>
						<X size={20} />
					</button>
				</div>

				{error && (
					<div className='bg-red-50 text-red-600 p-3 rounded-md mb-4'>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Ім'я користувача
						</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md'
							required
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Пароль
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md'
							required
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300'
						disabled={isLoading}
					>
						{isLoading ? 'Авторизація...' : 'Увійти'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginModal
