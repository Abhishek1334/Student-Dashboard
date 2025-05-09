import StudentsList from "../components/Dashboard/Studentlist";
import { useAuth } from "../hooks/useAuth";
import { Loader2, User } from "lucide-react";

const Dashboard = () => {
	const { user, loading } = useAuth();
	if (loading) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="flex flex-col items-center space-y-4">
					<Loader2 className="h-8 w-8 animate-spin text-blue-600" />
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full p-8 space-y-6 overflow-auto">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div className="flex flex-col sm:flex-row sm:items-center gap-4">
					<div className="bg-blue-100 p-3 rounded-full shrink-0">
						<User className="h-6 w-6 text-blue-600" />
					</div>
					<div className="min-w-0">
						<h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
							Welcome back, {user.email}!
						</h1>
						<p className="text-gray-600 mt-1 text-sm sm:text-base">
							Manage your students and track their progress
						</p>
					</div>
				</div>
			</div>
			
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Student Management</h2>
				</div>
				<div className="p-6">
			<StudentsList />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
