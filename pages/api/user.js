const cookie = require('cookie');
const axios = require('axios');

export default async function handler(req, res) {
	if (req.method !== 'GET') return res.status(405).end();

	try {
		const cookies = cookie.parse(req.headers.cookie || '');
		const token = cookies.token;

		if (!token) {
			return res.status(401).json({ message: 'Not authenticated' });
		}

		const response = await axios.get(
			'https://inventor-backend.onrender.com/api/v1/users/me',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return res.status(200).json(response.data);
	} catch (err) {
		console.error('[User API] error:', err.response?.data || err.message);
		return res.status(401).json({ message: 'Invalid token' });
	}
}
