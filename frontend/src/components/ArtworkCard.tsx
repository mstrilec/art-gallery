import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { artworkService } from '../services/api'
import { Artwork, ARTWORK_TYPE_LABELS } from '../types/artwork'
import Button from './Button'
import Modal from './Modal'

interface IArtworkCardProps {
	artwork: Artwork
	onDelete: (id: string) => void
}

const ArtworkCard: React.FC<IArtworkCardProps> = ({ artwork, onDelete }) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>('')
	const { isAdmin } = useAuth()

	const getRandomImage = () => {
		const imageNum = Math.floor(Math.random() * 1000) + 1
		return `https://picsum.photos/seed/${imageNum}/500/300`
	}

	useEffect(() => {
		setImageUrl(getRandomImage())
	}, [])

	const handleDelete = async () => {
		try {
			setIsDeleting(true)
			await artworkService.delete(artwork._id)
			onDelete(artwork._id)
			setIsDeleteModalOpen(false)
		} catch (error) {
			console.error('Помилка при видаленні:', error)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<>
			<div className='bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex flex-col h-full'>
				<div className='relative'>
					<img
						src={imageUrl}
						alt={artwork.title}
						className='rounded-xl w-full h-60 object-cover'
					/>
					{isAdmin && (
						<button
							onClick={() => setIsDeleteModalOpen(true)}
							className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors'
							aria-label='Delete'
						>
							<Trash2 size={16} />
						</button>
					)}
				</div>

				<div className='flex flex-col flex-grow mt-4'>
					<div className='flex justify-between text-lg font-bold'>
						<h3 className='line-clamp-1'>{artwork.title}</h3>
						<p className='text-green-600'>${artwork.price.toLocaleString()}</p>
					</div>

					<p className='text-gray-600 mb-1'>By {artwork.artist}</p>
					<p className='text-gray-600 mb-1'>
						Type: {ARTWORK_TYPE_LABELS[artwork.type]}
					</p>

					<div className='mt-auto pt-2'>
						<p
							className={`text-sm font-medium ${
								artwork.availability ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{artwork.availability
								? 'Available for sale'
								: 'For exhibition only'}
						</p>
					</div>
				</div>
			</div>

			{isDeleteModalOpen && (
				<Modal onClose={() => setIsDeleteModalOpen(false)}>
					<div className='text-center'>
						<h3 className='text-lg font-bold mb-4'>Confirm the deletion</h3>
						<p className='mb-6'>
							Are you sure you want to delete an item "
							{<span className='font-bold'>{artwork.title}</span>}"? This action
							cannot be canceled.
						</p>
						<div className='flex justify-center gap-4'>
							<Button
								text='Cancel'
								onClick={() => setIsDeleteModalOpen(false)}
							/>
							<Button
								text={isDeleting ? 'Deletion...' : 'Delete'}
								variant='danger'
								onClick={handleDelete}
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

export default ArtworkCard
