// StudentsList.jsx
import React, { useEffect, useState } from "react";
import { fetchStudents, addStudent } from "@/api/students";
import StudentCard from "./StudentCard";
import StudentCardSkeleton from "./StudentCardSkeleton";
import AddStudentModal from "@/components/AddStudentModal";
import { Users, Plus, Filter, ArrowUpDown, X, ChevronLeft, ChevronRight, Upload, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BulkImportModal from "./BulkImportModal";
import { useAuth } from "@/hooks/useAuth";

const Studentlist = () => {
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
	const { user } = useAuth();

	const fetchStudentsList = async () => {
		try {
			setLoading(true);
			const allStudents = await fetchStudents();
			if (!user?.uid && !user?.id) throw new Error("User not found");
			const userId = user.uid || user.id;
			const filtered = allStudents.filter(s => s.userId === userId);
			setStudents(filtered);
			setError("");
		} catch (err) {
			setError("Failed to fetch students");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) fetchStudentsList();
	}, [user]);

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
			const matchesYear = !filters.year || String(student.year) === filters.year;
			const matchesCourse = !filters.course || student.course === filters.course;
			const matchesSearch =
				!filters.search ||
				student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
				student.email.toLowerCase().includes(filters.search.toLowerCase());

			return matchesStatus && matchesYear && matchesCourse && matchesSearch;
		})
		.sort((a, b) => {
			if (!sortConfig.key) return 0;
			let aValue = a[sortConfig.key];
			let bValue = b[sortConfig.key];
			if (sortConfig.key === 'enrollmentDate' || sortConfig.key === 'createdAt') {
				aValue = new Date(aValue);
				bValue = new Date(bValue);
			} else if (sortConfig.key === 'age' || sortConfig.key === 'year') {
				aValue = Number(aValue);
				bValue = Number(bValue);
			}
			if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
			return 0;
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
		<div className="min-h-screen h-screen flex flex-col bg-gray-50 overflow-hidden">
			<div className="w-full max-w-4xl mx-auto flex-1 flex flex-col px-2 sm:px-3 md:px-4">
				{/* Sticky Top Bar */}
				<div className="sticky top-0 z-10 bg-gray-50 pt-3 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-200">
					<h1 className="text-base md:text-lg font-semibold text-gray-900">Students</h1>
					<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
						<AddStudentModal 
							onStudentAdded={(newStudent) => {
								const userId = user?.uid || user?.id;
								if (newStudent.userId === userId) {
									setStudents((prev) => [newStudent, ...prev]);
								}
								setShowAddModal(false);
							}} 
							open={showAddModal} 
							setOpen={setShowAddModal} 
						/>
						<BulkImportModal
							onImport={fetchStudentsList}
							open={showBulkImport}
							setOpen={setShowBulkImport}
						/>
					</div>
				</div>

				{/* Filters & Sorting */}
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-2 border-b border-gray-100">
					<div className="flex flex-col sm:flex-row gap-2 flex-1">
						<select
							name="status"
							value={filters.status}
							onChange={handleFilterChange}
							className="border border-gray-200 rounded px-2 py-1 text-xs md:text-sm bg-white"
						>
							<option value="">Status</option>
							<option value="Enrolled">Enrolled</option>
							<option value="Pending">Pending</option>
							<option value="Graduated">Graduated</option>
							<option value="Dropped">Dropped</option>
						</select>
						<select
							name="year"
							value={filters.year}
							onChange={handleFilterChange}
							className="border border-gray-200 rounded px-2 py-1 text-xs md:text-sm bg-white"
						>
							<option value="">Year</option>
							{[...new Set(students.map((s) => s.year))]
								.filter(Boolean)
								.sort()
								.map((year, idx) => (
									<option key={year + '-' + idx} value={year}>{year}</option>
								))}
						</select>
						<select
							name="course"
							value={filters.course}
							onChange={handleFilterChange}
							className="border border-gray-200 rounded px-2 py-1 text-xs md:text-sm bg-white"
						>
							<option value="">Course</option>
							{[...new Set(students.map((s) => s.course))].sort().map((course, idx) => (
								<option key={course + '-' + idx} value={course}>{course}</option>
							))}
						</select>
						<input
							name="search"
							type="text"
							value={filters.search}
							onChange={handleFilterChange}
							placeholder="Search..."
							className="border border-gray-200 rounded px-2 py-1 text-xs md:text-sm bg-white flex-1"
						/>
					</div>
					<div className="flex gap-2 items-center mt-2 sm:mt-0">
						<div className="flex gap-2 items-center">
							<select
								value={sortConfig.key || ''}
								onChange={e => handleSort(e.target.value)}
								className="border border-gray-200 rounded px-2 py-1 text-xs md:text-sm bg-white"
							>
								<option value="">Sort</option>
								<option value="enrollmentDate">Enrollment Date</option>
								<option value="age">Age</option>
								<option value="year">Year</option>
								<option value="createdAt">Created At</option>
							</select>
							<button
								type="button"
								onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }))}
								className="px-2 py-1 text-xs border rounded bg-gray-100 hover:bg-gray-200"
								title={`Sort ${sortConfig.direction === 'asc' ? 'Descending' : 'Ascending'}`}
							>
								{sortConfig.direction === 'asc' ? '↑' : '↓'}
							</button>
							<button
								onClick={resetFilters}
								className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 px-2"
							>
								<RotateCcw className="size-3" />
							</button>
						</div>
					</div>
				</div>

				{/* Pagination Bar - now below filters/search/sort and above student cards */}
				<div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 my-2 sm:my-4 text-xs sm:text-sm">
					<button
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						disabled={currentPage === 1}
						className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
					>
						Previous
					</button>
					<span className="text-gray-600 whitespace-nowrap">
						{currentPage} of {totalPages}
					</span>
					<span className="text-gray-500 whitespace-nowrap">
						{currentStudents.length} of {filteredAndSortedStudents.length} students
					</span>
					<button
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						disabled={currentPage === totalPages}
						className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
					>
						Next
					</button>
				</div>

				{/* Students Grid - fit to available height, scrollable if needed */}
				<div
					className="flex-1 py-2 pb-32 md:pb-10 overflow-y-auto md:overflow-y-visible"
					style={{ maxHeight: '60vh' }}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
						{currentStudents.map((student) => (
							<StudentCard key={student.id} student={student} />
						))}
					</div>
				</div>

				
			</div>
		</div>
	);
};

export default Studentlist;
