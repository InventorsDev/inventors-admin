// pages/inventors/invite.js
import { useState } from 'react';
import Layout from '@/layouts/main';
import Button from '@/components/Button';
import { Icon } from '@iconify/react';

export default function InviteLeadPage() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleInvite = async () => {
		setLoading(true);
		setMessage('');

		try {
			const res = await fetch('/api/invite-lead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Something went wrong');

			setMessage('Invitation sent successfully!');
			setEmail('');
		} catch (err) {
			setMessage(err.message || 'Failed to send invite.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white p-6 rounded-xl max-w-xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Invite a New Lead</h1>

			<label className="block text-sm mb-2">Lead's Email Address</label>
			<input
				type="email"
				className="form-input w-full mb-4"
				placeholder="lead@example.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			{message && (
				<p
					className={`text-sm mb-4 ${
						message.includes('success') ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{message}
				</p>
			)}

			<Button
				primaryButton
				buttonProps={{ onClick: handleInvite, disabled: loading || !email }}
				className="flex items-center gap-2"
			>
				{loading ? (
					<>
						<Icon icon="eos-icons:loading" className="animate-spin" />
						Sending...
					</>
				) : (
					<>
						<Icon icon="mdi:email-send-outline" />
						Send Invite
					</>
				)}
			</Button>
		</div>
	);
}

InviteLeadPage.getLayout = function getLayout(page) {
	return (
		<Layout title="Invite Lead" showBackButton>
			{page}
		</Layout>
	);
};
