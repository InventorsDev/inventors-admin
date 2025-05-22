import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
	return function AuthenticatedComponent(props) {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.replace('/login');
			}
		}, [loading, user]);

		if (loading || !user) {
			return (
				<div className="flex items-center justify-center h-screen">
					<p className="text-gray-500">Checking authentication...</p>
				</div>
			);
		}

		return <Component {...props} />;
	};
}
