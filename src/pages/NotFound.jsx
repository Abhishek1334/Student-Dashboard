import React from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {

	const navigate = useNavigate()

	return (
		<div className='flex flex-col justify-center items-center h-screen gap-4'>
			<p className='text-2xl'>404 - Page Not Found</p>
			<button onClick={() => navigate(-1)}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go Back</button>
		</div>
	)
}

export default NotFound