import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Icon } from '@iconify/react';

export default function CompleteProfilePage() {
	const router = useRouter();
	const { token } = router.query;

	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const res = await fetch('/api/complete-profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, token }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Something went wrong');

			setSuccess('Profile completed! Redirecting to login...');
			setTimeout(() => {
				router.push('/login');
			}, 2000);
		} catch (err) {
			setError(err.message || 'Failed to complete profile');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Complete Your Profile</title>
			</Head>

			<div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-green-100 flex items-center justify-center p-6">
				<div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 space-y-6">
					<h1 className="text-2xl font-semibold text-center">
						Complete Your Profile
					</h1>
					<p className="text-sm text-center text-gray-600">
						Set up your name and password to activate your account.
					</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1">First Name</label>
							<input
								type="text"
								name="firstName"
								value={form.firstName}
								onChange={handleChange}
								required
								className="form-input w-full"
							/>
						</div>
						<div>
							<label className="block text-sm mb-1">Last Name</label>
							<input
								type="text"
								name="lastName"
								value={form.lastName}
								onChange={handleChange}
								required
								className="form-input w-full"
							/>
						</div>
						<div>
							<label className="block text-sm mb-1">Password</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
								className="form-input w-full"
								minLength={6}
							/>
						</div>

						{error && <p className="text-sm text-red-600">{error}</p>}
						{success && <p className="text-sm text-green-600">{success}</p>}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-primaryGreen text-white py-3 rounded-lg flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<Icon icon="eos-icons:loading" className="animate-spin" />
									Submitting...
								</>
							) : (
								'Complete Profile'
							)}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
