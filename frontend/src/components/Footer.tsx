import { Linkedin, Mail, Twitter } from 'lucide-react'

const Footer = () => {
	return (
		<footer className='bg-black p-6 text-white mt-40 flex justify-between items-center w-full'>
			<div>
				<h2 className='font-extrabold text-xl'>ArtGalleryManager</h2>
				<p>Your go-to platform for managing and exploring artworks</p>
			</div>
			<div className='flex gap-4 cursor-pointer'>
				<a target='_blank' href='https://www.linkedin.com/feed/'>
					<Linkedin size={20} strokeWidth={1.5} />
				</a>
				<a target='_blank' href='https://x.com/?lang=en'>
					<Twitter size={20} strokeWidth={1.5} />
				</a>
				<a
					target='_blank'
					href='https://support.google.com/mail/answer/56256?hl=en'
				>
					<Mail size={20} strokeWidth={1.5} />
				</a>
			</div>
		</footer>
	)
}

export default Footer
