import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

const PUBLIC_ROUTES = ['/login'];

function GuardedRoute({ Component, pageProps }) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const isPublic = PUBLIC_ROUTES.includes(router.pathname);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-gray-600">Loading...</p>
			</div>
		);
	}

	if (!isPublic && !user) {
		if (typeof window !== 'undefined') {
			router.replace('/login');
		}
		return null;
	}

	if (isPublic && user && router.pathname === '/login') {
		router.replace('/dashboard'); // or wherever you want to send logged-in users
		return null;
	}

	return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<AuthProvider>
			{getLayout(<GuardedRoute Component={Component} pageProps={pageProps} />)}
		</AuthProvider>
	);
}

export default MyApp;
