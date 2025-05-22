// pages/api/invite-lead.js
const cookie = require('cookie');
const axios = require('axios');

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	const cookies = cookie.parse(req.headers.cookie || '');
	const token = cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { email } = req.body;

	if (!email || !email.includes('@')) {
		return res.status(400).json({ message: 'Invalid email address' });
	}

	try {
		const response = await axios.post(
			'https://inventor-backend.onrender.com/api/v1/admins/lead/invite',
			{ email },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return res.status(201).json({ message: 'Invitation sent successfully' });
	} catch (err) {
		const status = err.response?.status;
		const backendMessage =
			err.response?.data?.message || 'Something went wrong';

		if (status === 409) {
			return res
				.status(409)
				.json({ message: 'This email has already been invited.' });
		}

		console.error('[Invite Lead API]', err.message);
		return res.status(500).json({ message: backendMessage });
	}
}
