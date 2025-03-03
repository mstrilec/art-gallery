import { LogIn, LogOut, Palette, User, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const Header: React.FC = () => {
	const { user, isAdmin, logout, isAuthenticated } = useAuth()
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

	return (
		<header className='bg-white p-[16px] shadow-md h-14 flex items-center justify-between'>
			<div className='flex gap-2 items-center'>
				<Palette size={24} strokeWidth={3} />
				<h1 className='text-lg font-extrabold'>ArtGalleryManager</h1>
			</div>

			<div className='flex items-center gap-4'>
				{isAuthenticated ? (
					<>
						<div className='flex items-center gap-2'>
							<User size={18} />
							<span className='text-sm font-medium'>{user?.username}</span>
							{isAdmin && (
								<span className='text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full'>
									Адмін
								</span>
							)}
						</div>
						<button
							onClick={logout}
							className='flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900'
						>
							<LogOut size={18} />
							Вийти
						</button>
					</>
				) : (
					<>
						<button
							onClick={() => setIsLoginModalOpen(true)}
							className='flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900'
						>
							<LogIn size={18} />
							Увійти
						</button>
						<button
							onClick={() => setIsRegisterModalOpen(true)}
							className='flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900'
						>
							<UserPlus size={18} />
							Зареєструватися
						</button>
					</>
				)}
			</div>

			{isLoginModalOpen && (
				<LoginModal
					isOpen={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
				/>
			)}

			{isRegisterModalOpen && (
				<RegisterModal
					isOpen={isRegisterModalOpen}
					onClose={() => setIsRegisterModalOpen(false)}
					onRegisterSuccess={() => {
						setIsRegisterModalOpen(false)
						setIsLoginModalOpen(true)
					}}
				/>
			)}
		</header>
	)
}

export default Header
