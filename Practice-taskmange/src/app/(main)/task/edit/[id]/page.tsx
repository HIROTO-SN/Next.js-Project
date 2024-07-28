import React from 'react'

const page = ({ params } : {
	params: {id: string }	
}) => {
	return (
		<div>TaskEditPage{params.id}</div>
	)
}

export default page