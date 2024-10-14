import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>
				<Sidebar />
				{children}
			</main>
		</>
	);
}
