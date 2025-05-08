import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentDetails } from "../api/students";
import {
	Trash2,
	User,
	ArrowLeft,
	Pencil,
	Mail,
	Phone,
	Calendar,
	BookOpen,
	MapPin,
	Clock,
} from "lucide-react";
import StudentData from "@/components/StudentDetails/StudentData";
import StudentDetailHeader from "@/components/StudentDetails/StudentDetailHeader";
import StudentDetailsTopbar from "@/components/StudentDetails/StudentDetailsTopbar";

const StudentDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [student, setStudent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStudentDetails = async () => {
			try {
				const studentData = await getStudentDetails(id);
				setStudent(studentData);
			} catch (err) {
				setError("Failed to fetch student details");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchStudentDetails();
	}, [id]);

	if (loading) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="relative h-24 w-24">
					<div className="absolute inset-0 rounded-full border-t-4 border-blue-600 animate-spin"></div>
					<div className="absolute inset-2 rounded-full border-r-4 border-blue-400 animate-spin animate-reverse"></div>
					<div className="absolute inset-4 rounded-full border-b-4 border-blue-200 animate-spin animate-delay-500"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="text-center p-8 bg-white rounded-2xl shadow-md max-w-md animate-fadeIn">
					<div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
						<span className="text-2xl">!</span>
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Error
					</h2>
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => navigate("/dashboard")}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Back to Dashboard
					</button>
				</div>
			</div>
		);
	}

	if (!student) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="text-center p-8 bg-white rounded-2xl shadow-md max-w-md animate-fadeIn">
					<div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
						<User size={24} />
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Student Not Found
					</h2>
					<p className="text-gray-600 mb-4">
						The student you're looking for doesn't exist or has been
						removed.
					</p>
					<button
						onClick={() => navigate("/dashboard")}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Back to Dashboard
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full p-8 overflow-auto">
			<div className="max-w-5xl mx-auto space-y-6">
				{/* Breadcrumb and actions */}
				<StudentDetailsTopbar student={student} setStudent={setStudent}/>

				{/* Student header card */}
				<StudentDetailHeader student={student} />

				{/* Quick info cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center space-x-3">
							<div className="bg-blue-100 p-2 rounded-lg">
								<Mail className="h-5 w-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Email</p>
								<p className="text-gray-900 font-medium truncate">{student.email}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center space-x-3">
							<div className="bg-green-100 p-2 rounded-lg">
								<Phone className="h-5 w-5 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Phone</p>
								<p className="text-gray-900 font-medium">{student.phone || "Not provided"}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center space-x-3">
							<div className="bg-purple-100 p-2 rounded-lg">
								<BookOpen className="h-5 w-5 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Course</p>
								<p className="text-gray-900 font-medium">{student.course}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
						<div className="flex items-center space-x-3">
							<div className="bg-amber-100 p-2 rounded-lg">
								<Calendar className="h-5 w-5 text-amber-600" />
							</div>
							<div>
								<p className="text-sm text-gray-500">Year</p>
								<p className="text-gray-900 font-medium">{student.year}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Detail cards grid */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="bg-indigo-100 p-2 rounded-lg mt-1">
									<User className="h-5 w-5 text-indigo-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Age</p>
									<p className="text-gray-900 font-medium">{student.age} years</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="bg-teal-100 p-2 rounded-lg mt-1">
									<Clock className="h-5 w-5 text-teal-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Enrollment Date</p>
									<p className="text-gray-900 font-medium">
										{new Date(student.enrollmentDate).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="bg-red-100 p-2 rounded-lg mt-1">
									<MapPin className="h-5 w-5 text-red-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Address</p>
									<p className="text-gray-900 font-medium">{student.address || "Not provided"}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDetails;
