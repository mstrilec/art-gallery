import React, { useState } from 'react'
import { artworkService } from '../services/api'
import {
	ARTWORK_TYPES,
	ARTWORK_TYPE_LABELS,
	Artwork,
	ArtworkType,
	CreateArtworkDto,
} from '../types/artwork'
import Button from './Button'

interface IArtworkFormProps {
	onSubmit: (artwork: Artwork) => void
	initialData?: Artwork
}

const ArtworkForm: React.FC<IArtworkFormProps> = ({
	onSubmit,
	initialData,
}) => {
	const [formData, setFormData] = useState<CreateArtworkDto>(
		initialData || {
			title: '',
			artist: '',
			type: 'painting',
			price: 0,
			availability: true,
		}
	)

	const [errors, setErrors] = useState<
		Partial<Record<keyof CreateArtworkDto, string>>
	>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const validate = (): boolean => {
		const newErrors: Partial<Record<keyof CreateArtworkDto, string>> = {}

		if (!formData.title) {
			newErrors.title = 'Title is required'
		} else if (formData.title.length > 99) {
			newErrors.title = 'The name cannot exceed 99 characters'
		}

		if (!formData.artist) {
			newErrors.artist = 'The name of the artist is required'
		} else if (formData.artist.length > 50) {
			newErrors.artist = "The artist's name cannot exceed 50 characters"
		}

		if (!formData.type) {
			newErrors.type = 'Type required'
		}

		if (formData.price <= 0) {
			newErrors.price = 'The price must be greater than zero'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target

		if (type === 'checkbox') {
			const checkbox = e.target as HTMLInputElement
			setFormData({
				...formData,
				[name]: checkbox.checked,
			})
		} else if (name === 'price') {
			setFormData({
				...formData,
				[name]: parseFloat(value) || 0,
			})
		} else {
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validate()) {
			return
		}

		setIsSubmitting(true)

		try {
			let artwork: Artwork

			if (initialData?._id) {
				artwork = await artworkService.update(initialData._id, formData)
			} else {
				artwork = await artworkService.create(formData)
			}

			onSubmit(artwork)
		} catch (error) {
			console.error('Помилка при збереженні:', error)
			setErrors({
				title: 'Error saving. Please try again.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<h2 className='text-xl font-bold mb-4'>
				{initialData ? 'Edit an exhibit' : 'Add a new exhibit'}
			</h2>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Name*
				</label>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					className={`w-full p-2 border rounded-md ${
						errors.title ? 'border-red-500' : 'border-gray-300'
					}`}
					maxLength={99}
				/>
				{errors.title && (
					<p className='text-red-500 text-xs mt-1'>{errors.title}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Artist*
				</label>
				<input
					type='text'
					name='artist'
					value={formData.artist}
					onChange={handleChange}
					className={`w-full p-2 border rounded-md ${
						errors.artist ? 'border-red-500' : 'border-gray-300'
					}`}
					maxLength={50}
				/>
				{errors.artist && (
					<p className='text-red-500 text-xs mt-1'>{errors.artist}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Type*
				</label>
				<select
					name='type'
					value={formData.type}
					onChange={handleChange}
					className={`w-full p-2 border rounded-md ${
						errors.type ? 'border-red-500' : 'border-gray-300'
					}`}
				>
					{ARTWORK_TYPES.map(type => (
						<option key={type} value={type}>
							{ARTWORK_TYPE_LABELS[type as ArtworkType]}
						</option>
					))}
				</select>
				{errors.type && (
					<p className='text-red-500 text-xs mt-1'>{errors.type}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Price* (грн)
				</label>
				<input
					type='number'
					name='price'
					value={formData.price}
					onChange={handleChange}
					min='1'
					step='0.01'
					className={`w-full p-2 border rounded-md ${
						errors.price ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{errors.price && (
					<p className='text-red-500 text-xs mt-1'>{errors.price}</p>
				)}
			</div>

			<div className='flex items-center'>
				<input
					type='checkbox'
					name='availability'
					checked={formData.availability}
					onChange={handleChange}
					className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
				/>
				<label className='ml-2 block text-sm text-gray-700'>
					Available for sale
				</label>
			</div>

			<div className='flex justify-end pt-4'>
				<Button
					text={isSubmitting ? 'Збереження...' : 'Зберегти'}
					type='submit'
					variant='primary'
				/>
			</div>
		</form>
	)
}

export default ArtworkForm
