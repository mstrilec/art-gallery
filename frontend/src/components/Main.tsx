import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ArtworkFilters, artworkService } from '../services/api'
import { Artwork } from '../types/artwork'
import ArtworkForm from './ArtworkForm'
import ArtworkList from './ArtworkList'
import Button from './Button'
import FilterPanel from './FilterPanel'
import Modal from './Modal'

const Main = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [filters, setFilters] = useState<ArtworkFilters>({})
	const [artworks, setArtworks] = useState<Artwork[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const { isAdmin } = useAuth()

	useEffect(() => {
		const fetchArtworks = async () => {
			try {
				const response = await artworkService.getAll(filters)
				setArtworks(response)
			} catch (error) {
				console.error('Error loading artworks:', error)
			}
		}

		fetchArtworks()
	}, [filters])

	const handleAddArtwork = (newArtwork: Artwork) => {
		setArtworks(prev => [...prev, newArtwork])
		setIsAddModalOpen(false)
	}

	const handleDeleteArtwork = (id: string) => {
		setArtworks(prev => prev.filter(artwork => artwork._id !== id))
	}

	return (
		<main className='container px-7 w-full mt-10'>
			<h2 className='text-2xl font-extrabold'>Explore Our Collection</h2>
			<FilterPanel
				filters={filters}
				setFilters={setFilters}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<ArtworkList
				filters={filters}
				artworks={artworks}
				setArtworks={setArtworks}
				onDelete={handleDeleteArtwork}
				searchTerm={searchTerm}
			/>
			{isAdmin && (
				<div className='flex gap-4 mt-20'>
					<Button
						text='Add New Artwork'
						onClick={() => setIsAddModalOpen(true)}
					/>
				</div>
			)}

			{isAddModalOpen && (
				<Modal onClose={() => setIsAddModalOpen(false)}>
					<ArtworkForm onSubmit={handleAddArtwork} />
				</Modal>
			)}
		</main>
	)
}

export default Main
