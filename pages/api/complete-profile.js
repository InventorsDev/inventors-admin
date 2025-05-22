// pages/api/complete-profile.js
import axios from 'axios';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	const {
		token, // query param
		firstName,
		lastName,
		password,
	} = req.body;

	if (!token || !firstName || !lastName || !password) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const response = await axios.post(
			`https://inventor-backend.onrender.com/api/v1/users/invite/complete-invite?token=${token}`,
			{
				firstName,
				lastName,
				password,
			}
		);

		return res.status(201).json({ message: 'Profile completed' });
	} catch (err) {
		console.error(
			'[Complete Profile Error]',
			err.response?.data || err.message
		);
		const msg = err.response?.data?.message || 'Failed to complete profile';
		return res.status(err.response?.status || 500).json({ message: msg });
	}
}
