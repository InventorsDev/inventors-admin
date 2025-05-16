import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Layout({ children, title, showBackButton = false }) {
	return (
		<main className="flex h-screen overflow-hidden">
			{/* Fixed Sidebar */}
			<div className="hidden md:block w-[260px] shrink-0 border-r border-gray-100">
				<Sidebar />
			</div>

			{/* Main Content Area */}
			<section className="flex flex-col flex-1 h-full">
				{/* Fixed Navbar */}
				<div className="shrink-0">
					<Navbar title={title} showBackButton={showBackButton} />
				</div>

				{/* Scrollable Page Content */}
				<div className="overflow-y-auto px-4 py-6 md:px-6 md:pt-8 bg-[#F8FAFB] flex-1">
					<div className="bg-mintGreen rounded-xl p-6">{children}</div>
				</div>
			</section>
		</main>
	);
}
