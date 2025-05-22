const cookie = require('cookie');
import axios from 'axios';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	try {
		const { email, password } = req.body;

		const response = await axios.post(
			'https://inventor-backend.onrender.com/api/v1/auth/login',
			{
				email,
				password,
			}
		);

		const token = response.data.access_token;

		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 7 * 24 * 60 * 60,
				path: '/',
				sameSite: 'lax',
			})
		);

		return res.status(200).json({ success: true });
	} catch (err) {
		console.error(
			'[Login API] Backend error:',
			err.response?.data || err.message
		);
		const message = err.response?.data?.message || 'Login failed';
		return res.status(401).json({ message });
	}
}
