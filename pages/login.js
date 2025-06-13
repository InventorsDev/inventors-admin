import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import Spinner from '@/components/Spinner';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginLoading, setLoginLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignIn = async (e) => {
		e.preventDefault();

		// initialize loading state
		setLoginLoading(true);

		if (!email || !password) {
			setError('Email and password are required');
			return;
		}

		try {
			setError('');
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Login failed');

			window.location.href = '/';
		} catch (err) {
			setError(err.message);
		} finally {
			setLoginLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Login – Inventors</title>
			</Head>

			<div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center px-4 py-12">
				<div className="bg-white rounded-xl w-full max-w-md px-8 py-10 space-y-6">
					<div className="flex justify-center">
						<Image
							src="/images/logo-dark.png"
							alt="Inventors Logo"
							width={120}
							height={40}
							className="object-contain"
						/>
					</div>

					<h2 className="text-2xl font-bold text-center text-gray-800">
						Sign in to Inventors
					</h2>
					<p className="text-center text-sm text-gray-500">
						Access your dashboard and manage your profile.
					</p>

					<form onSubmit={handleSignIn} className="space-y-4">
						{error && <p className="text-sm text-red-600">{error}</p>}

						<div>
							<label htmlFor="email" className="block text-sm font-medium">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="form-input w-full mt-1"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="form-input w-full mt-1"
							/>
							<p className="text-xs text-teal-600 mt-1 hover:underline cursor-pointer">
								Forgot password?
							</p>
						</div>

						<button
							type="submit"
							className="w-full bg-primaryGreen text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loginLoading}
						>
							{loginLoading? <Spinner /> : "Sign In"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
