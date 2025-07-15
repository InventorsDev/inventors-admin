import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Layout from '@/layouts/main';
import Table from '@/components/Table';
import Button from '@/components/Button';
import ViewEvent from '@/components/ViewEvent';
import EditEvent from '@/components/EditEvent';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const mockEvents = [
	{
		id: 1,
		title: 'SDG Chapter Four',
		author: 'Opeoluwa Ogunmodede',
		date: '26 May, 2021',
		time: '10am - 11am',
		documents: 2,
		status: 'Approved',
	},
	{
		id: 2,
		title: 'SDG Chapter Four',
		author: 'Opeoluwa Ogunmodede',
		date: '26 May, 2021',
		time: '10am - 11am',
		documents: 2,
		status: 'Unapproved',
	},
	// Add more mock events as needed
];

const tabs = [
	{ name: 'All', active: true },
	{ name: 'Approved', active: false },
	{ name: 'Unapproved', active: false },
];

export default function EventsPage() {
	const [selectedEvents, setSelectedEvents] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [allEvents] = useState(mockEvents);
	const [filteredEvents, setFilteredEvents] = useState(mockEvents);
	const [currentPage, setCurrentPage] = useState(1);
	const [eventsPerPage] = useState(5);
	const [showEditOrView, setShowEditOrView] = useState(false);
	const [openActionMenu, setOpenActionMenu] = useState(null);
	const actionMenuRefs = useRef({});

	// Required Initialized parameters for view and edit events
	const router = useRouter();
	const searchParams = useSearchParams();
	const view = searchParams.get("view");

	// Click-away-to-close for actions dropdown
	useEffect(() => {
		function handleClickOutside(event) {
			if (openActionMenu !== null) {
				const buttonRef = actionMenuRefs.current[openActionMenu];
				const menuRef = actionMenuRefs.current[`menu-${openActionMenu}`];
				if (
					(buttonRef && buttonRef.contains(event.target)) ||
					(menuRef && menuRef.contains(event.target))
				) {
					// Click is inside the button or menu, do nothing
					return;
				}
				setOpenActionMenu(null);
			}
    	}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openActionMenu]);

	// Tab logic
	const handleTabClick = (tabIdx) => {
		tabs.forEach((tab, idx) => (tab.active = idx === tabIdx));
		const tab = tabs[tabIdx];
		if (tab.name === 'All') {
			setFilteredEvents(allEvents);
		} else {
			setFilteredEvents(allEvents.filter((event) => event.status === tab.name));
		}
		setSelectedEvents([]);
		setSearchText('');
		setCurrentPage(1);
	};

	// Search logic
	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchText(value);
		const activeTab = tabs.find((tab) => tab.active);
		let filtered = allEvents;
		if (activeTab.name !== 'All') {
			filtered = filtered.filter((event) => event.status === activeTab.name);
		}
		if (value) {
			filtered = filtered.filter((event) =>
				event.title.toLowerCase().includes(value.toLowerCase())
			);
		}
		setFilteredEvents(filtered);
		setCurrentPage(1);
	};

	// Pagination
	const indexOfLastEvent = currentPage * eventsPerPage;
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
	const currentEvents = filteredEvents.slice(
		indexOfFirstEvent,
		indexOfLastEvent
	);
	const nextPage = () => {
		if (currentPage < Math.ceil(filteredEvents.length / eventsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Table columns
	const columns = [
		{
			key: 'select',
			title: (
				<input
					type="checkbox"
					className="accent-primaryGreen"
					checked={
						filteredEvents.length > 0 &&
						selectedEvents.length === filteredEvents.length
					}
					onChange={(e) => {
						if (e.target.checked) {
							setSelectedEvents(filteredEvents);
						} else {
							setSelectedEvents([]);
						}
					}}
				/>
			),
		},
		{ key: 'title', title: 'Title' },
		{ key: 'author', title: 'Author' },
		{ key: 'date', title: 'Date' },
		{ key: 'documents', title: 'Documents' },
		{ key: 'status', title: 'Status' },
		{ key: 'actions', title: 'Actions' },
	];

	return (
		<div className="p-6">
			{view == "edit" ? 
				<EditEvent 
					show={showEditOrView}
					handleCloseEvent={() => setShowEditOrView(false)}
				/>
				: <ViewEvent
					show={showEditOrView}
					handleCloseEvent={() => setShowEditOrView(false)}
				/>
			}

			<div className="bg-white rounded-xl p-6 flex items-center justify-between w-full">
				<input
					type="search"
					placeholder="Search event"
					value={searchText}
					onChange={handleSearch}
					className="border-[2px] border-[#E0E6EB] p-3 rounded-lg w-1/4 outline-none text-[#98A4AE]"
				/>
				<div className="flex gap-4 items-center">
					<Button
						mintGreenBtn
						buttonProps={{
							onClick: () => setSelectedEvents(filteredEvents),
							disabled: filteredEvents.length === selectedEvents.length,
						}}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{selectedEvents.length > 0
							? `Selected (${selectedEvents.length})`
							: 'Select All'}
					</Button>
					<Button primaryButton className="flex items-center gap-3">
						<Icon icon="tabler:calendar-event" className="text-lg" />
						Calendar
					</Button>
					<Button buttonProps={{ onClick: () => router.push("/events/create") }} primaryButton className="flex items-center gap-3">
						<Icon icon="tabler:plus" className="text-lg" />
						Add new
					</Button>
				</div>
			</div>
			<div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-5">
				<ul className="flex items-center justify-between">
					{tabs.map((tab, idx) => (
						<li
							key={tab.name}
							className={`${
								tab.active ? 'border-primaryGreen border-b-[3px]' : ''
							} w-full flex items-center justify-center p-4 cursor-pointer text-[#464646]`}
							onClick={() => handleTabClick(idx)}
						>
							{tab.name}
						</li>
					))}
				</ul>
			</div>
			{currentEvents.length === 0 ? (
				<div className="h-[400px] w-full flex justify-center items-center">
					<div className="bg-white rounded-xl p-7 space-y-4 flex justify-center flex-col items-center">
						<Image
							src="/images/figma-icon.png"
							alt="Figma Icon"
							width={50}
							height={50}
							className="mb-3"
						/>
						<div className="text-center space-y-2">
							<h3 className="font-semibold text-[#29343D] text-lg">
								No events found
							</h3>
							<p className="text-[#98A4AE]">
								Try adjusting your search or filters.
							</p>
						</div>
					</div>
				</div>
			) : (
				<>
					<Table
						columns={columns}
						data={currentEvents}
						rowKey={(row) => row.id}
						renderRow={(event, idx) => [
							<td className="py-4 px-5" key="select">
								<input
									type="checkbox"
									className="accent-primaryGreen"
									checked={selectedEvents.some((e) => e.id === event.id)}
									onChange={(e) => {
										if (e.target.checked) {
											setSelectedEvents([...selectedEvents, event]);
										} else {
											setSelectedEvents(
												selectedEvents.filter((e) => e.id !== event.id)
											);
										}
									}}
								/>
							</td>,
							<td className="py-4 px-5" key="title">
								<div className="flex items-center gap-3">
									<Image
										src="/images/profile-icon.png"
										alt="Event Icon"
										width={40}
										height={40}
										className="rounded-full"
									/>
									<span className="font-semibold text-[#464646]">
										{event.title}
									</span>
								</div>
							</td>,
							<td className="py-4 px-5 text-[#B5B5B5]" key="author">
								{event.author}
							</td>,
							<td className="py-4 px-5 text-[#B5B5B5]" key="date">
								{event.date}
								<div className="text-xs text-[#98A4AE]">{event.time}</div>
							</td>,
							<td className="py-4 px-5 text-[#B5B5B5]" key="documents">
								+{event.documents} documents
								<Icon
									icon="tabler:download"
									className="inline ml-2 text-lg text-primaryGreen cursor-pointer"
								/>
							</td>,
							<td className="py-4 px-5" key="status">
								<span
									className={`px-4 py-2 rounded-full text-sm ${
										event.status === 'Approved'
											? 'text-primaryGreen bg-mintGreen'
											: event.status === 'Unapproved'
											? 'text-yellow-500 bg-yellow-100'
											: ''
									}`}
								>
									{event.status}
								</span>
							</td>,
							<td className="py-4 px-5 relative" key="actions">
								<button
									className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none"
									onClick={() =>
										setOpenActionMenu(
											openActionMenu === event.id ? null : event.id
										)
									}
									aria-label="Open actions menu"
									type="button"
									ref={(el) => {
										actionMenuRefs.current[event.id] = el;
									}}
								>
									<Icon
										icon="tabler:dots-vertical"
										className="text-[#909090] text-lg"
									/>
								</button>
								{openActionMenu === event.id && (
									<div
										ref={(el) => {
											actionMenuRefs.current[`menu-${event.id}`] = el;
										}}
										className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in"
									>
										<button
											className="w-full flex items-center gap-2 px-4 py-2 hover:bg-mintGreen text-left"
											type="button"
											onClick={(e) => {
												e.preventDefault();
												router.push("");
												setShowEditOrView(true)
											}}
										>
											<Icon icon="ph:eye" /> View Event
										</button>
										<button
											className="w-full flex items-center gap-2 px-4 py-2 hover:bg-mintGreen text-left"
											type="button"
											onClick={(e) => {
												e.preventDefault();
												router.push("?view=edit");
												setShowEditOrView(true);
											}}
										>
											<Icon icon="tabler:edit" /> Edit Event
										</button>
										<button
											className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 text-left"
											type="button"
										>
											<Icon icon="tabler:trash" /> Delete Event
										</button>
									</div>
								)}
							</td>,
						]}
					/>
					<div className="flex items-center justify-between w-full pt-5 px-5 font-semibold">
						<p className="text-[#070707]">
							Page {currentPage} of{' '}
							{Math.ceil(filteredEvents.length / eventsPerPage)}
						</p>
						<div className="flex gap-4 items-center">
							<Button
								className="disabled:opacity-50 disabled:cursor-not-allowed"
								buttonProps={{
									onClick: prevPage,
									disabled: currentPage === 1,
								}}
							>
								Prev
							</Button>
							<Button
								className="disabled:opacity-50 disabled:cursor-not-allowed"
								buttonProps={{
									onClick: nextPage,
									disabled:
										currentPage ===
										Math.ceil(filteredEvents.length / eventsPerPage),
								}}
							>
								Next
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

EventsPage.getLayout = function getLayout(page) {
	return <Layout title="Events">{page}</Layout>;
};
