import axios from 'axios'
import { Artwork, CreateArtworkDto, UpdateArtworkDto } from '../types/artwork'

const API_URL = 'http://localhost:3000'
const API_ENDPOINT = `${API_URL}/artworks`

export interface ArtworkFilters {
	price?: 'asc' | 'desc'
	artist?: string
	type?: string
}

export const artworkService = {
	async getAll(filters?: ArtworkFilters): Promise<Artwork[]> {
		const params = new URLSearchParams()

		if (filters?.price) {
			params.append('price', filters.price)
		}

		if (filters?.artist) {
			params.append('artist', filters.artist)
		}

		if (filters?.type) {
			params.append('type', filters.type)
		}

		const queryString = params.toString() ? `?${params.toString()}` : ''
		const response = await axios.get<Artwork[]>(`${API_ENDPOINT}${queryString}`)
		return response.data
	},

	async getById(id: string): Promise<Artwork> {
		const response = await axios.get<Artwork>(`${API_ENDPOINT}/${id}`)
		return response.data
	},

	async create(artwork: CreateArtworkDto): Promise<Artwork> {
		const response = await axios.post<Artwork>(API_ENDPOINT, artwork)
		return response.data
	},

	async update(id: string, artwork: UpdateArtworkDto): Promise<Artwork> {
		const response = await axios.put<Artwork>(`${API_ENDPOINT}/${id}`, artwork)
		return response.data
	},

	async delete(id: string): Promise<void> {
		await axios.delete(`${API_ENDPOINT}/${id}`)
	},
}
