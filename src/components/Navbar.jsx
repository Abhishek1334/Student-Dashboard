import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, LogOut, Home, BookOpen, User, GraduationCap } from "lucide-react";

const Navbar = () => {
	const { user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (err) {
			console.error("Logout error:", err);
		}
	};

	const toggleMenu = () => setIsOpen(!isOpen);

	const isActive = (path) => location.pathname === path;

	return (
		<nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
			<div className="max-w-7xl mx-auto">
				<div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<Link
						to="/"
						className="text-xl font-bold tracking-wide flex items-center text-gray-900 hover:text-blue-600 transition-colors"
					>
						<GraduationCap size={24} className="mr-2 text-blue-600" />
						<span>eduTracker</span>
					</Link>

					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
							aria-label="Toggle menu"
						>
							{isOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
						</button>
					</div>

					<div
						className={`
            md:flex items-center space-x-1
            ${
				isOpen
					? "absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-md animate-slideDown"
					: "hidden"
			}
            md:static md:bg-transparent md:shadow-none md:border-none
          `}
					>
						{user && (
							<NavLink to="/dashboard" icon={<Home size={18} />} isActive={isActive("/dashboard")}>
							Dashboard
						</NavLink>
						)}

						{user ? (
							<div className="px-4 py-3 md:py-0 md:pl-2">
								<button
									onClick={handleLogout}
									className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium"
								>
									<LogOut size={18} className="mr-1.5" />
									<span>Logout</span>
								</button>
							</div>
						) : (
							<>
								<NavLink to="/login" icon={<User size={18} />} isActive={isActive("/login")}>
									Login
								</NavLink>
								<div className="px-4 py-3 md:py-0 md:pl-2">
									<Link
										to="/register"
										className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
									>
										Register
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

const NavLink = ({ to, children, icon, isActive }) => (
	<Link
		to={to}
		className={`flex items-center px-4 py-3 md:py-2 rounded-lg md:mx-1 transition-colors font-medium
			${isActive 
				? "text-blue-600 bg-blue-50" 
				: "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
			}`}
	>
		{icon && <span className="mr-1.5">{icon}</span>}
		{children}
	</Link>
);

export default Navbar;
