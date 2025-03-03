import React from 'react'
import { ArtworkFilters } from '../services/api'
import { ARTWORK_TYPES, ARTWORK_TYPE_LABELS } from '../types/artwork'

interface IFilterPanelProps {
	filters: ArtworkFilters
	setFilters: React.Dispatch<React.SetStateAction<ArtworkFilters>>
	searchTerm: string
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const FilterPanel: React.FC<IFilterPanelProps> = ({
	filters,
	setFilters,
	searchTerm,
	setSearchTerm,
}) => {
	const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as 'asc' | 'desc' | ''
		setFilters(prev => ({
			...prev,
			price: value || undefined,
		}))
	}

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters(prev => ({
			...prev,
			type: e.target.value || undefined,
		}))
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div>
			<div className='w-full flex flex-col md:flex-row mt-5 gap-5'>
				<input
					type='text'
					placeholder='Search...'
					value={searchTerm}
					onChange={handleSearchChange}
					className='p-2 border border-gray-400 rounded-xl flex-grow'
				/>

				<div className='flex gap-4 flex-wrap md:flex-nowrap'>
					<select
						className='p-2 border border-gray-400 rounded-xl min-w-[200px]'
						value={filters.price || ''}
						onChange={handlePriceChange}
					>
						<option value=''>Sort by</option>
						<option value='asc'>Price: from the lowest</option>
						<option value='desc'>Price: from the highest</option>
					</select>

					<select
						className='p-2 border border-gray-400 rounded-xl min-w-[200px]'
						value={filters.type || ''}
						onChange={handleTypeChange}
					>
						<option value=''>All types</option>
						{ARTWORK_TYPES.map(type => (
							<option key={type} value={type}>
								{ARTWORK_TYPE_LABELS[type]}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
}

export default FilterPanel
