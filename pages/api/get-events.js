import axios from "axios";

export default async function handler(req, res) {
    if (req.method != "GET") return res.status(405).end();
    
    try {
        const response = await axios.get("https://inventor-backend.onrender.com/api/v1/event", {
            headers: {
                "Accept": "*/*"
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        const backendMessage = error.response?.data?.message || "Failed to get events."

        console.error('[Get Events API]', error.message);
        return res.status(500).json({ message: backendMessage })
    }
}