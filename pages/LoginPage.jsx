import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const from = location.state?.from?.pathname || '/';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (!email || !password) {
			setError('Email dan password harus diisi');
			return;
		}

		try {
			await login({ email, password });
			navigate(from, { replace: true });
		} catch (err) {
			setError(err.message || 'Gagal login. Silakan periksa email dan password Anda.');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-12 p-8 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
			<h1 className="text-3xl font-bold mb-6 text-white text-center">
				Masuk
			</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-300"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-300"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 shadow transition-colors"
				>
					Masuk
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
