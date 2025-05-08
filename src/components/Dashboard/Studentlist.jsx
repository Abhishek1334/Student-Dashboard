// StudentsList.jsx
import React, { useEffect, useState } from "react";
import { fetchStudents, addStudent } from "@/api/students";
import StudentCard from "./StudentCard";
import StudentCardSkeleton from "./StudentCardSkeleton";
import AddStudentModal from "@/components/AddStudentModal";
import { Users, Plus, Filter, ArrowUpDown, X, ChevronLeft, ChevronRight, Upload, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BulkImportModal from "./BulkImportModal";

const StudentsList = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showBulkImport, setShowBulkImport] = useState(false);
	const [filters, setFilters] = useState({
		status: "",
		year: "",
		course: "",
		search: "",
	});
	const [showFilters, setShowFilters] = useState(false);
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: "asc",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const studentsPerPage = 6;
	const navigate = useNavigate();

	const fetchStudentsList = async () => {
		try {
			setLoading(true);
			const data = await fetchStudents();
			setStudents(data);
			setError("");
		} catch (err) {
			setError("Failed to fetch students");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudentsList();
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [filters, sortConfig]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleSort = (key) => {
		setSortConfig((prev) => ({
			key,
			direction:
				prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const resetFilters = () => {
		setFilters({
			status: "",
			year: "",
			course: "",
			search: "",
		});
		setSortConfig({
			key: null,
			direction: "asc",
		});
	};

	const filteredAndSortedStudents = students
		.filter((student) => {
			const matchesStatus = !filters.status || student.status === filters.status;
			const matchesYear = !filters.year || student.year === parseInt(filters.year);
			const matchesCourse = !filters.course || student.course === filters.course;
			const matchesSearch =
				!filters.search ||
				student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
				student.email.toLowerCase().includes(filters.search.toLowerCase());

			return matchesStatus && matchesYear && matchesCourse && matchesSearch;
		})
		.sort((a, b) => {
			if (!sortConfig.key) return 0;

			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];

			if (typeof aValue === "string") {
				return sortConfig.direction === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			return sortConfig.direction === "asc"
				? aValue - bValue
				: bValue - aValue;
		});

	const totalPages = Math.ceil(filteredAndSortedStudents.length / studentsPerPage);
	const currentStudents = filteredAndSortedStudents.slice(
		(currentPage - 1) * studentsPerPage,
		currentPage * studentsPerPage
	);

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(6)].map((_, index) => (
					<StudentCardSkeleton key={index} />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-600">{error}</p>
				<button
					onClick={fetchStudentsList}
					className="mt-4 text-blue-600 hover:text-blue-800"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-[2000px] mx-auto px-2 sm:px-3 md:px-4">
				{/* Header */}
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
					<h1 className="text-lg md:text-xl font-semibold text-gray-900">Students</h1>
					<div className="flex flex-col xs:flex-row gap-2">
						<AddStudentModal onStudentAdded={fetchStudentsList} open={showAddModal} setOpen={setShowAddModal} />
						<button
							onClick={() => setShowBulkImport(true)}
							className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
						>
							<Upload className="size-3.5" />
							Import
						</button>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-lg shadow-sm p-2 sm:p-3 mb-3 md:mb-4">
					<div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2">
						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
							<select
								value={filters.status}
								onChange={(e) => handleFilterChange("status", e.target.value)}
								className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">All Status</option>
								<option value="Enrolled">Enrolled</option>
								<option value="Pending">Pending</option>
								<option value="Graduated">Graduated</option>
								<option value="Dropped">Dropped</option>
							</select>
						</div>
						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
							<select
								value={filters.year}
								onChange={(e) => handleFilterChange("year", e.target.value)}
								className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">All Years</option>
								{[...new Set(students.map((s) => s.year))].sort().map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">Course</label>
							<select
								value={filters.course}
								onChange={(e) => handleFilterChange("course", e.target.value)}
								className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">All Courses</option>
								{[...new Set(students.map((s) => s.course))].sort().map((course) => (
									<option key={course} value={course}>
										{course}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
							<input
								type="text"
								value={filters.search}
								onChange={(e) => handleFilterChange("search", e.target.value)}
								placeholder="Search by name or email..."
								className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>
					<div className="flex justify-end mt-2">
						<button
							onClick={resetFilters}
							className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
						>
							<RotateCcw className="size-3" />
							Reset
						</button>
					</div>
				</div>

				{/* Students Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
					{currentStudents.map((student) => (
						<div
							key={student.id}
							className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
						>
							<div className="flex flex-col">
								<div className="flex items-start gap-2.5">
									<div className="size-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
										<span className="text-sm font-medium text-gray-600">
											{student.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</span>
									</div>
									<div className="min-w-0 flex-1">
										<h3 className="text-sm font-medium text-gray-900 truncate">{student.name}</h3>
										<p className="text-xs text-gray-500 truncate mt-0.5">{student.email}</p>
									</div>
								</div>

								<div className="mt-2.5 flex items-center justify-between">
									<div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
										<div>
											<p className="text-xs text-gray-500">Course</p>
											<p className="text-sm text-gray-900 truncate max-w-[120px]">{student.course}</p>
										</div>
										<div>
											<p className="text-xs text-gray-500">Year</p>
											<p className="text-sm text-gray-900">{student.year}</p>
										</div>
									</div>
									<span
										className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
											student.status === "Enrolled"
												? "bg-green-100 text-green-800"
												: student.status === "Pending"
												? "bg-yellow-100 text-yellow-800"
												: student.status === "Graduated"
												? "bg-blue-100 text-blue-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{student.status}
									</span>
								</div>

								<div className="mt-2.5 flex justify-end">
									<button
										onClick={() => navigate(`/student/${student.id}`)}
										className="text-xs text-blue-600 hover:text-blue-800 font-medium"
									>
										View Details
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="mt-3 flex flex-col xs:flex-row items-center justify-between gap-1.5">
					<div className="text-[10px] text-gray-500">
						{currentStudents.length} of {filteredAndSortedStudents.length} students
					</div>
					<div className="flex items-center gap-1.5">
						<button
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}
							className="px-1.5 py-0.5 text-[10px] border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>
						<span className="text-[10px] text-gray-600">
							{currentPage} of {totalPages}
						</span>
						<button
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
							className="px-1.5 py-0.5 text-[10px] border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>

				{/* Modals */}
				<BulkImportModal open={showBulkImport} setOpen={setShowBulkImport} onImport={fetchStudentsList} />
			</div>
		</div>
	);
};

export default StudentsList;
