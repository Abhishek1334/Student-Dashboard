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

	const handleClick = (e) => {
		// Only navigate if the click wasn't on a link
		if (!e.target.closest('a')) {
			navigate(`/student/${student.id}`);
		}
	};

	return (
		<div
			className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group p-3 sm:p-4 md:p-6 flex flex-col justify-between h-full"
			onClick={handleClick}
		>
			<div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
				<div className="space-y-0.5 md:space-y-1">
					<a
						href={`/student/${student.id}`}
						onClick={(e) => e.stopPropagation()}
						className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors hover:underline"
					>
						{student.name}
					</a>
					<a
						href={`/student/${student.id}`}
						onClick={(e) => e.stopPropagation()}
						className="text-xs md:text-sm text-gray-500 hover:text-blue-600 hover:underline block"
					>
						{student.email}
					</a>
				</div>
				<span className={`px-2 py-0.5 rounded-full text-xs font-medium mt-1 md:mt-0 ${getStatusColor(student.status)}`}>
					{student.status}
				</span>
			</div>
			<div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
				<div className="flex items-center text-xs md:text-sm text-gray-600">
					<Book className="h-4 w-4 mr-1.5 md:mr-2 text-blue-500" />
					<span>{student.course}</span>
				</div>
				<div className="flex items-center text-xs md:text-sm text-gray-600">
					<CalendarDays className="h-4 w-4 mr-1.5 md:mr-2 text-blue-500" />
					<span>Year {student.year}</span>
				</div>
				{student.phone && (
					<div className="flex items-center text-xs md:text-sm text-gray-600">
						<Phone className="h-4 w-4 mr-1.5 md:mr-2 text-blue-500" />
						<span>{student.phone}</span>
					</div>
				)}
				{student.address && (
					<div className="flex items-center text-xs md:text-sm text-gray-600">
						<MapPin className="h-4 w-4 mr-1.5 md:mr-2 text-blue-500" />
						<span className="truncate">{student.address}</span>
					</div>
				)}
			</div>
			<div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 flex items-center justify-between">
				<div className="text-xs md:text-sm text-gray-500">
					Enrolled on {new Date(student.enrollmentDate).toLocaleDateString()}
				</div>
				<ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
			</div>
		</div>
	);
};

export default StudentCard;
