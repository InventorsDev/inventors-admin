import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/layouts/main';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Button from '@/components/Button';
import ViewProfile from '@/components/ViewProfile';

import { inventorsLeads } from '@/utils/leads';
import { shortenEmail, shortenPhone } from '@/utils/helpers';

const tabs = [
	{ name: 'All', active: true },
	{ name: 'Approved', active: false },
	{ name: 'Unapproved', active: false },
	{ name: 'Declined', active: false },
	{ name: 'Deactivated', active: false },
];

const Inventors = () => {
	const router = useRouter();

	const [selectedLeads, setSelectedLeads] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [allLeads, setAllLeads] = useState(inventorsLeads);
	const [filteredLeads, setFilteredLeads] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [leadsPerPage, setLeadsPerPage] = useState(5);

	const [showUserProfile, setShowUserProfile] = useState(false);
	const [idOfLeadToShow, setIdOfLeadToShow] = useState(null);

	const indexOfLastLead = currentPage * leadsPerPage;
	const indexOfFirstLead = indexOfLastLead - leadsPerPage;
	const currentLeads = filteredLeads?.slice(indexOfFirstLead, indexOfLastLead);

	const nextPage = () => {
		if (currentPage < Math.ceil(filteredLeads?.length / leadsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		setFilteredLeads(allLeads);
	}, [allLeads]);

	useEffect(() => {
		if (tabs.some((tab) => tab.active) && searchText === '') {
			setSelectedLeads([]);
			const tab = tabs.find((tab) => tab.active);
			if (tab.name === 'All') {
				setFilteredLeads(allLeads);
			} else {
				setFilteredLeads(allLeads.filter((lead) => lead.status === tab.name));
			}
		} else if (tabs.some((tab) => tab.active) && searchText !== '') {
			const tab = tabs.find((tab) => tab.active);
			if (tab.name === 'All') {
				const filteredLeads = allLeads.filter((lead) =>
					lead.name.toLowerCase().includes(searchText.toLowerCase())
				);
				setFilteredLeads(filteredLeads);
			} else {
				const filteredLeads = allLeads.filter(
					(lead) =>
						lead.status === tab.name &&
						lead.name.toLowerCase().includes(searchText.toLowerCase())
				);
				setFilteredLeads(filteredLeads);
			}
		} else {
			setFilteredLeads(allLeads);
		}
	}, [searchText, allLeads]);

	const tableHeaders = [
		{
			key: 'select',
			content: (
				<input
					type="checkbox"
					className="accent-primaryGreen"
					checked={
						filteredLeads?.length > 0 &&
						selectedLeads.length === filteredLeads?.length
					}
					onChange={(e) => {
						if (e.target.checked) {
							// Select all leads
							setSelectedLeads(filteredLeads);
						} else {
							// Unselect all leads
							setSelectedLeads([]);
						}
					}}
				/>
			),
		},
		{ key: 'name', content: 'Name' },
		{ key: 'school', content: 'School (Alumni)' },
		{ key: 'email', content: 'Email' },
		{ key: 'phone', content: 'Phone', className: 'hidden lg:block' },
		{ key: 'status', content: 'Status' },
		{ key: 'action', content: 'Action' },
	];

	return (
		<>
			{/* View User Profile Slider */}
			<ViewProfile
				show={showUserProfile}
				idOfLeadToShow={idOfLeadToShow}
				handleCloseProfile={() => setShowUserProfile(false)}
			/>

			{/* Search */}
			<div className="bg-white rounded-xl p-6 flex items-center justify-between w-full">
				<input
					type="search"
					placeholder="Search lead"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="border-[2px] border-[#E0E6EB] p-3 rounded-lg w-1/4 outline-none text-[#98A4AE]"
				/>
				<div className="flex gap-4 items-center">
					<Button
						mintGreenBtn
						buttonProps={{
							onClick: () => setSelectedLeads(filteredLeads),
							disabled: filteredLeads?.length === selectedLeads.length,
						}}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{selectedLeads.length > 0
							? `Selected (${selectedLeads.length})`
							: 'Select all'}
					</Button>
					{selectedLeads.length > 0 ? (
						<Button dangerButton className={`flex items-center gap-3`}>
							<Icon icon="bi:trash" className="text-lg" />
							Deactivate ({selectedLeads.length})
						</Button>
					) : (
						<Button
							primaryButton
							className={`flex items-center gap-3`}
							buttonProps={{
								onClick: () => router.push('/inventors/invite'),
							}}
						>
							<Icon icon="tabler:users" className="text-lg" />
							Invite Lead
							{/* <Icon
								icon="solar:alt-arrow-down-line-duotone"
								className="text-lg"
							/> */}
						</Button>
					)}
				</div>
			</div>

			{/* Tabs */}
			<div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-5">
				<ul className="flex items-center justify-between">
					{tabs.map((tab, index) => (
						<li
							key={index}
							className={`${
								tab.active ? 'border-primaryGreen border-b-[3px]' : ''
							} w-full flex items-center justify-center p-4  cursor-pointer text-[#464646]`}
							onClick={() => {
								// Filter leads based on tab
								if (tab.name === 'All') {
									setFilteredLeads(allLeads);
									tabs.forEach((tab) => (tab.active = false));
									tab['active'] = true;
									setSelectedLeads([]);
									setSearchText('');
								} else {
									setFilteredLeads(
										allLeads?.filter((lead) => lead.status === tab.name)
									);
									tabs.forEach((tab) => (tab.active = false));
									tab['active'] = true;
									setSelectedLeads([]);
									setSearchText('');
								}
							}}
						>
							{tab.name}
						</li>
					))}
				</ul>
			</div>

			{currentLeads?.length === 0 && (
				<div className="h-[600px] w-full flex justify-center items-center">
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
								Oops, Nothing to see here, right?
							</h3>
							<p className="text-[#98A4AE]">Let’s get your profile set up.</p>
							<Button primaryButton>Go to profile</Button>
						</div>
					</div>
				</div>
			)}

			{currentLeads?.length > 0 && (
				<>
					<div className="bg-white rounded-xl p-6 mt-5">
						<table className="min-w-full">
							<thead className="text-left text-[#464646] font-normal">
								<tr className="border-b-[2px] border-[#EFF2F7]">
									{tableHeaders.map((header) => (
										<th
											key={header.key}
											className={`py-4 px-5 ${header.className}`}
										>
											{header.content}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="">
								{currentLeads?.map((lead, index) => (
									<tr
										key={index}
										className={`border-b-[2px]  ${
											selectedLeads.some(
												(selectedLead) => selectedLead.id === lead.id
											)
												? 'bg-mintGreen border-white'
												: 'border-[#EFF2F7]'
										}`}
									>
										<td className="py-4 px-5">
											<input
												type="checkbox"
												className="accent-primaryGreen"
												checked={selectedLeads.some(
													(selectedLead) => selectedLead.id === lead.id
												)}
												onChange={(e) => {
													if (e.target.checked) {
														setSelectedLeads([...selectedLeads, lead]);
													} else {
														setSelectedLeads(
															selectedLeads.filter(
																(selectedLead) => selectedLead.id !== lead.id
															)
														);
													}
												}}
											/>
										</td>
										<td className="py-4 px-5">
											<div className="flex items-center gap-3">
												<Image
													src="/images/profile-icon.png" // Replace with actual image path or dynamic URL if available
													alt="Profile Icon"
													width={40}
													height={40}
													className="rounded-full"
												/>
												<div className="">
													<p className="font-semibold text-[#464646]">
														{lead.name}
													</p>
													<span className="text-[#B5B5B5] text-sm">
														{lead.position}
													</span>
												</div>
											</div>
										</td>
										<td className="py-4 px-5 text-[#B5B5B5]">
											{lead.school + (lead.alumni ? ' (Alumni)' : '')}
										</td>
										<td className="py-4 px-5 text-[#B5B5B5]">
											{shortenEmail(lead.email)}
										</td>
										<td className="py-4 px-5 text-[#B5B5B5] hidden lg:block">
											{shortenPhone(lead.phone)}
										</td>
										<td className="py-4 px-5">
											<span
												className={`${
													lead.status === 'Approved'
														? 'text-primaryGreen bg-mintGreen'
														: lead.status === 'Declined'
														? 'text-red-500 bg-red-100'
														: lead.status === 'Deactivated'
														? 'text-gray-500 bg-gray-200'
														: 'text-yellow-500 bg-yellow-100'
												} px-4 py-2 rounded-full text-sm`}
											>
												{lead.status}
											</span>
										</td>
										<td className="py-4 px-5 text-[#B5B5B5]">
											<Icon
												icon="ph:eye"
												className="text-[#909090] text-lg cursor-pointer"
												onClick={() => {
													setShowUserProfile(true);
													setIdOfLeadToShow(lead.id);
												}}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="flex items-center justify-between w-full pt-5 px-5 font-semibold">
						<p className="text-[#070707]">
							Page {currentPage} of{' '}
							{Math.ceil(filteredLeads?.length / leadsPerPage)}
						</p>
						<div className="flex gap-4 items-center">
							<Button
								className={`disabled:opacity-50 disabled:cursor-not-allowed`}
								buttonProps={{
									onClick: prevPage,
									disabled: currentPage === 1,
								}}
							>
								Prev
							</Button>
							<Button
								className={`disabled:opacity-50 disabled:cursor-not-allowed`}
								buttonProps={{
									onClick: nextPage,
									disabled:
										currentPage ===
										Math.ceil(filteredLeads?.length / leadsPerPage),
								}}
							>
								Next
							</Button>
						</div>
					</div>
				</>
			)}

			{/* deactivate leads dialog box */}
			{/* <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center drop-shadow-xl">
				<div className="bg-white rounded-xl p-7 space-y-4 flex justify-center flex-col items-center">
					<Image
						src="/images/profile-icon.png"
						alt="Figma Icon"
						width={60}
						height={60}
						className="mb-3"
					/>
					<div className="text-center space-y-3">
						<h3 className="font-semibold text-[#29343D] text-lg">
							Deactivate Kelvin’s profile?
						</h3>
						<p className="text-[#98A4AE]">
							You’re about to delete this lead’s profile...
						</p>
						<div className="flex items-center justify-between gap-5 text-sm">
							<button className="bg-[#FFE7E9] text-[#FF2B3F] rounded-lg p-2 w-full flex items-center justify-center gap-2">
								<Icon icon="bi:trash" className="text-sm" />
								Yes, continue
							</button>
							<button className="bg-transparent text-[#464646] rounded-lg p-2 w-full border border-[#D3D3D3] ">
								No, go back!
							</button>
						</div>
						<button className="bg-primaryGreen text-white rounded-lg py-2 px-4 w-full">
							View profile
						</button>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default Inventors;

Inventors.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
