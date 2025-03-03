import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ArtworkFilters, artworkService } from '../services/api'
import { Artwork } from '../types/artwork'
import ArtworkCard from './ArtworkCard'

interface IArtworkListProps {
	filters: ArtworkFilters
	artworks: Artwork[]
	setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>
	onDelete: (id: string) => void
	searchTerm: string
}

const ArtworkList: React.FC<IArtworkListProps> = ({
	filters,
	artworks,
	setArtworks,
	onDelete,
	searchTerm,
}) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArtworks = async () => {
			try {
				setLoading(true)
				const response = await artworkService.getAll(filters)
				setArtworks(response)
			} catch (error) {
				console.error('Помилка при завантаженні експонатів:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchArtworks()
	}, [filters, setArtworks])

	const filteredArtworks = artworks.filter(artwork => {
		if (!searchTerm) return true

		const searchLower = searchTerm.toLowerCase()
		return (
			artwork.title.toLowerCase().includes(searchLower) ||
			artwork.artist.toLowerCase().includes(searchLower)
		)
	})

	if (loading) {
		return (
			<div className='flex justify-center items-center h-40'>
				<Loader2 className='w-8 h-8 animate-spin text-gray-500' />
			</div>
		)
	}

	if (filteredArtworks.length === 0) {
		return (
			<div className='mt-10 text-center text-gray-500'>
				No exhibits were found that match your criteria.
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
			{filteredArtworks.map(artwork => (
				<ArtworkCard key={artwork._id} artwork={artwork} onDelete={onDelete} />
			))}
		</div>
	)
}

export default ArtworkList
