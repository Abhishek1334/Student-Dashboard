import React from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

	return (
		<div className="h-screen flex flex-col bg-gray-50">
			<Navbar />
			<main className="flex-1 overflow-hidden">
				<div className="h-full">
				<Outlet />
			</div>
			</main>
			{!isAuthPage && (
				<footer className="bg-white border-t border-gray-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<p className="text-center text-gray-500 text-sm">
							© {new Date().getFullYear()} Student Management System. All rights reserved.
						</p>
					</div>
				</footer>
			)}
		</div>
	)
}

export default Layout