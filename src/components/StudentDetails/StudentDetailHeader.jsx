import React from 'react'


const StudentDetailHeader = ({ student }) => {

	// Generate status badge color
	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case "active":
				return "bg-green-100 text-green-800 ring-green-600/20";
			case "inactive":
				return "bg-gray-100 text-gray-800 ring-gray-600/20";
			case "pending":
				return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
			case "graduated":
				return "bg-blue-100 text-blue-800 ring-blue-600/20";
			default:
				return "bg-gray-100 text-gray-800 ring-gray-600/20";
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
			<div className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-8 text-white max-md:px-4 max-md:py-4">
				<h1 className="text-3xl font-bold max-md:text-2xl max-md:line-clamp-2 max-md:text-center max-sm:text-left">{student.name}</h1>
				<div className="flex items-center mt-3 max-md:flex-col max-md:gap-2">
					<div
						className={`px-3 py-1 rounded-full text-sm font-medium ring-1 ${getStatusColor(
							student.status
						)}`}
					>
						{student.status}
					</div>
					<div className="w-1 h-1 rounded-full bg-white/30 mx-3"></div>
					<div className="text-white/85 text-sm">
						{student.course} • Year {student.year}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StudentDetailHeader