// contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		try {
			setLoading(true);
			const res = await fetch('/api/user');
			if (!res.ok) throw new Error('Not authenticated');
			const data = await res.json();
			setUser(data);
		} catch (err) {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) throw new Error(data.message || 'Login failed');

		await fetchUser();
		router.push('/dashboard');
	};

	const logout = async () => {
		await fetch('/api/logout');
		setUser(null);
		router.push('/login');
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
