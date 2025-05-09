import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading ) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
