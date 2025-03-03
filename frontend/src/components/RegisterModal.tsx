import { X } from 'lucide-react'
import React, { useState } from 'react'
import { authService } from '../services/auth'

interface RegisterModalProps {
	isOpen: boolean
	onClose: () => void
	onRegisterSuccess: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({
	isOpen,
	onClose,
	onRegisterSuccess,
}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	if (!isOpen) return null

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (password !== confirmPassword) {
			setError('Паролі не співпадають')
			return
		}

		if (password.length < 6) {
			setError('Пароль повинен містити щонайменше 6 символів')
			return
		}

		setIsLoading(true)

		try {
			const roles = isAdmin ? ['user', 'admin'] : ['user']
			await authService.register({ username, password, roles })
			onRegisterSuccess()
		} catch (err: any) {
			console.error('Registration error:', err)
			setError(err.response?.data?.message || 'Помилка реєстрації')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold'>Реєстрація</h2>
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

					<div className='mb-4'>
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
						<p className='text-xs text-gray-500 mt-1'>
							Пароль повинен містити щонайменше 6 символів
						</p>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Підтвердження паролю
						</label>
						<input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md'
							required
						/>
					</div>

					<div className='mb-6'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={isAdmin}
								onChange={e => setIsAdmin(e.target.checked)}
								className='mr-2 h-4 w-4 text-blue-600'
							/>
							<span className='text-sm text-gray-700'>
								Зареєструватись як адміністратор
							</span>
						</label>
					</div>

					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300'
						disabled={isLoading}
					>
						{isLoading ? 'Реєстрація...' : 'Зареєструватися'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegisterModal
