import axios from "axios";

export default async function handler(req, res) {
    const isAdmin = true;
    const baseUrl = isAdmin ? "https://inventor-backend.onrender.com/api/v1/admins/event": "https://inventor-backend.onrender.com/api/v1/event"
    if (req.method !== "DELETE") return res.status(405).end();
    
    const { eventId } = await req.query;
    if (!eventId) return res.status(400);

    try {
        const response = await axios.delete(`${baseUrl}/${eventId}`, {
            headers: {
                "Accept": "*/*"
            }
        });

        return res.status(201).json(response);
    } catch (error) {
        const backendMessage = error.response?.data?.message || "Failed to delete event.";

        console.error("[Delete Event]:", backendMessage);
        return res.status(500).json(backendMessage);
    }
}