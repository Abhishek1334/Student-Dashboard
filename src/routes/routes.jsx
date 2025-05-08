import { createBrowserRouter } from "react-router-dom";
import App from "../App"; 
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import StudentDetails from "../pages/StudentDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute"; 

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />, 
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/dashboard",
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "/student/:id",
				element: (
					<ProtectedRoute>
						<StudentDetails />
					</ProtectedRoute>
				),
			},
			{
				path: "*",
				element: <NotFound />,
			},
			
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
