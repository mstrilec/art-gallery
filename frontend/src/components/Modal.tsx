import { X } from 'lucide-react'
import React, { ReactNode } from 'react'

interface ModalProps {
	children: ReactNode
	onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	return (
		<div className='fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative'>
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer'
				>
					<X size={24} />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
