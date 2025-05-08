import React from 'react'
import { DetailCard } from './DetailCard'
import { Mail, Phone, Calendar, BookOpen, MapPin, Clock, User, ArrowLeft, Pencil } from 'lucide-react'
const StudentData = ({ student, loading, error }) => {


	if(loading){
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if(error){
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}


	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<DetailCard
				icon={<Mail className="text-blue-600" size={20} />}
				title="Email"
				value={student.email}
			/>

			<DetailCard
				icon={<Phone className="text-green-600" size={20} />}
				title="Phone"
				value={student.phone}
			/>

			<DetailCard
				icon={<User className="text-indigo-600" size={20} />}
				title="Age"
				value={`${student.age} years`}
			/>

			<DetailCard
				icon={<BookOpen className="text-amber-600" size={20} />}
				title="Course"
				value={student.course}
			/>

			<DetailCard
				icon={<Calendar className="text-teal-600" size={20} />}
				title="Year"
				value={student.year}
			/>

			<DetailCard
				icon={<MapPin className="text-red-600" size={20} />}
				title="Address"
				value={student.address}
				fullWidth={true}
			/>

			<DetailCard
				icon={<Clock className="text-purple-600" size={20} />}
				title="Enrollment Date"
				value={new Date(student.enrollmentDate).toLocaleDateString(
					"en-US",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					}
				)}
			/>
		</div>
	);
}

export default StudentData