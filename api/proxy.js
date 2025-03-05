import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        const response = await axios.get(url, {
            headers: {
                "Referer": "https://anime-world.co", // Change this as needed
                "User-Agent": req.headers["user-agent"]
            },
        });

        res.setHeader("Content-Type", response.headers["content-type"]);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
