export type ArtworkType =
	| 'painting'
	| 'sculpture'
	| 'photography'
	| 'digital'
	| 'installation'

export interface Artwork {
	_id: string
	title: string
	artist: string
	type: ArtworkType
	price: number
	availability: boolean
}

export interface CreateArtworkDto {
	title: string
	artist: string
	type: ArtworkType
	price: number
	availability: boolean
}

export interface UpdateArtworkDto {
	title?: string
	artist?: string
	type?: ArtworkType
	price?: number
	availability?: boolean
}

export const ARTWORK_TYPES: ArtworkType[] = [
	'painting',
	'sculpture',
	'photography',
	'digital',
	'installation',
]

export const ARTWORK_TYPE_LABELS: Record<ArtworkType, string> = {
	painting: 'Painting',
	sculpture: 'Sculpture',
	photography: 'Photography',
	digital: 'Digital',
	installation: 'Installation',
}
