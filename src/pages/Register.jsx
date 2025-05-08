import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, UserPlus } from "lucide-react";

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await register(email, password);
			navigate('/dashboard');
		} catch (err) {
			setError('Failed to create an account');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 animate-fade-in">
			<div className="w-full max-w-md space-y-4 animate-slide-up">
				<div className="text-center">
					<h2 className="text-2xl font-extrabold text-gray-900 animate-slide-down">
						Create your account
				</h2>
					<p className="mt-1 text-sm text-gray-600 animate-slide-down [animation-delay:150ms]">
						Already have an account?{' '}
						<Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
							Sign in
						</Link>
					</p>
				</div>
				<form className="space-y-3" onSubmit={handleSubmit}>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm animate-slide-down">
							{error}
						</div>
					)}
					<div className="rounded-md shadow-sm space-y-3 animate-scale-in">
						<div className="animate-slide-in [animation-delay:200ms]">
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
					<input
								id="email"
								name="email"
						type="email"
								autoComplete="email"
								required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
								placeholder="Email address"
					/>
						</div>
						<div className="animate-slide-in [animation-delay:300ms]">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
					<input
								id="password"
								name="password"
						type="password"
								autoComplete="new-password"
								required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
								placeholder="Password"
					/>
						</div>
						<div className="animate-slide-in [animation-delay:400ms]">
							<label htmlFor="confirm-password" className="sr-only">
								Confirm Password
							</label>
					<input
								id="confirm-password"
								name="confirm-password"
						type="password"
								autoComplete="new-password"
								required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
								placeholder="Confirm Password"
					/>
						</div>
					</div>

					<div className="animate-slide-in [animation-delay:500ms]">
					<button
						type="submit"
						disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
							{loading ? 'Creating account...' : 'Create account'}
					</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
