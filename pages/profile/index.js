import Layout from '@/layouts/main';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const dummyProfile = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'johndoe@example.com',
	phoneNumber: '+234 801 234 5678',
	country: 'Nigeria',
	city: 'Lagos',
	shortBio:
		'I’m a frontend engineer passionate about accessibility and dev communities.',
	jobTitle: 'Frontend Engineer',
	company: 'TechVerse Inc',
	yearsOfExperience: '3–5 years',
	school: 'University of Lagos',
	primarySkill: 'JavaScript',
	secondarySkill: 'Figma',
	technologies: ['React', 'Tailwind', 'Next.js', 'TypeScript'],
	interestAreas: ['Web Development', 'Open Source', 'Developer Relations'],
	linkedinUrl: 'https://linkedin.com/in/johndoe',
	twitterUrl: 'https://x.com/johndoe',
	facebookUrl: 'https://facebook.com/johndoe',
	websiteUrl: 'https://johndoe.dev',
	skillProfileUrl: 'https://github.com/johndoe',
};

export default function ProfilePage() {
	const user = dummyProfile;

	return (
		<div className="space-y-8">
			{/* Top section: Basic Info */}
			<div className="flex flex-col md:flex-row gap-6 items-start">
				<Image
					src="/images/profile-image.png"
					alt="Profile picture"
					width={140}
					height={140}
					className="rounded-full"
				/>
				<div className="space-y-1">
					<h1 className="text-2xl font-bold">
						{user.firstName} {user.lastName}
					</h1>
					<p className="text-sm text-gray-500">
						{user.jobTitle} @ {user.company}
					</p>
					<p className="text-sm text-gray-500">
						{user.city}, {user.country}
					</p>
					<p className="text-sm text-gray-500">{user.phoneNumber}</p>
					<p className="text-sm text-gray-500">{user.email}</p>
				</div>
			</div>

			{/* Short bio */}
			<div>
				<h2 className="font-semibold text-lg mb-1">Short Bio</h2>
				<p className="text-sm text-gray-700">{user.shortBio}</p>
			</div>

			{/* Professional Info */}
			<div>
				<h2 className="font-semibold text-lg mb-2">Professional Information</h2>
				<div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
					<p>
						<strong>Years of Experience:</strong> {user.yearsOfExperience}
					</p>
					<p>
						<strong>School:</strong> {user.school}
					</p>
					<p>
						<strong>Primary Skill:</strong> {user.primarySkill}
					</p>
					<p>
						<strong>Secondary Skill:</strong> {user.secondarySkill}
					</p>
					<p>
						<strong>Areas of Interest:</strong> {user.interestAreas.join(', ')}
					</p>
				</div>
			</div>

			{/* Technologies */}
			<div>
				<h2 className="font-semibold text-lg mb-2">Technologies / Tools</h2>
				<div className="flex flex-wrap gap-2 text-sm">
					{user.technologies.map((tech, i) => (
						<span
							key={i}
							className="bg-green-100 text-gray-700 px-3 py-1 rounded-xl"
						>
							{tech}
						</span>
					))}
				</div>
			</div>

			{/* Contact / Social Links */}
			<div>
				<h2 className="font-semibold text-lg mb-2">Social & Contact Links</h2>
				<div className="flex flex-wrap gap-4 text-gray-600 text-xl">
					<a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:linkedin" />
					</a>
					<a href={user.twitterUrl} target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:twitter" />
					</a>
					<a href={user.facebookUrl} target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:facebook" />
					</a>
					<a
						href={user.skillProfileUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="mdi:github" />
					</a>
					<a href={user.websiteUrl} target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:web" />
					</a>
				</div>
			</div>

			{/* Edit button */}
			<div className="pt-4">
				<Link
					href="/profile/edit"
					className="inline-block bg-primaryGreen text-white px-6 py-2 rounded-md text-sm font-medium"
				>
					Edit Profile
				</Link>
			</div>
		</div>
	);
}

ProfilePage.getLayout = function getLayout(page) {
	return <Layout title="My Profile">{page}</Layout>;
};
