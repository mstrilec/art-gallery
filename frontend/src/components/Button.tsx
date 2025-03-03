import React from 'react'

interface IButtonProps {
	text: string
	onClick?: () => void
	variant?: 'primary' | 'danger'
	type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<IButtonProps> = ({
	text,
	onClick,
	variant = 'primary',
	type = 'button',
}) => {
	const baseClasses =
		'p-3 rounded-xl w-[150px] cursor-pointer shadow-md transition duration-300 ease-in-out'

	const variantClasses = {
		primary: 'text-white bg-black hover:bg-gray-800 hover:shadow-lg',
		danger: 'text-white bg-red-600 hover:bg-red-700 hover:shadow-lg',
	}

	return (
		<button
			type={type}
			className={`${baseClasses} ${variantClasses[variant]}`}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export default Button
