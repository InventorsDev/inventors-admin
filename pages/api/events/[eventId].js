import axios from "axios";

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { eventId } = await req.query;
    if (!eventId) return res.status(400).end();

    try {
        const response = await axios.get(`https://inventor-backend.onrender.com/api/v1/event/${eventId}`, {
            headers: {
                "accept": "*/*"
            }
        });

        return res.status(201).json(response.data);
    } catch (error) {
        const backendMessage = error.response?.data?.message || "Could not fetch event details.";
        
        console.error('[Get Events API]', error.message);
        return res.status(500).json({ message: backendMessage });
    }
}