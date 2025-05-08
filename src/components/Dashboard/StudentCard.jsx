import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, CalendarDays, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

const StudentCard = ({ student }) => {
	const navigate = useNavigate();

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case 'enrolled':
				return 'bg-green-100 text-green-700';
			case 'pending':
				return 'bg-yellow-100 text-yellow-700';
			case 'graduated':
				return 'bg-blue-100 text-blue-700';
			case 'dropped':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	return (
		<div
			className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
			onClick={() => navigate(`/student/${student.id}`)}
		>
			<div className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
							{student.name}
						</h3>
						<p className="text-sm text-gray-500">{student.email}</p>
					</div>
					<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
						{student.status}
					</span>
				</div>

				<div className="mt-4 space-y-3">
					<div className="flex items-center text-sm text-gray-600">
						<Book className="h-4 w-4 mr-2 text-blue-500" />
						<span>{student.course}</span>
					</div>

					<div className="flex items-center text-sm text-gray-600">
						<CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
						<span>Year {student.year}</span>
					</div>

					{student.phone && (
						<div className="flex items-center text-sm text-gray-600">
							<Phone className="h-4 w-4 mr-2 text-blue-500" />
							<span>{student.phone}</span>
						</div>
					)}

					{student.address && (
						<div className="flex items-center text-sm text-gray-600">
							<MapPin className="h-4 w-4 mr-2 text-blue-500" />
							<span className="truncate">{student.address}</span>
						</div>
					)}
				</div>

				<div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Enrolled on {new Date(student.enrollmentDate).toLocaleDateString()}
					</div>
					<ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
				</div>
			</div>
		</div>
	);
};

export default StudentCard;
