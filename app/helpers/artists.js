import { connectToDatabase } from "./db"

export default async function handler(req, res) {
    console.log(`Received ${req.method} request at /api/artists`)
    console.log("Request body:", req.body)

    if (req.method === "POST") {
        const { artists } = req.body
        if (!artists || !Array.isArray(artists)) {
            console.error("Invalid artists list:", artists)
            return res.status(400).json({ error: "Artists array is needed" })
        }

        try {
            const db = await connectToDatabase()
            const collection = db.collection("artists")

            const operations = artists.map((artist) => ({
                updateOne: {
                    filter: { name: artist.name },
                    update: { $set: artist },
                    upsert: true,
                },
            }))

            const result = await collection.bulkWrite(operations)
            console.log(`Bulk write completed: ${result.nUpserted} upserted, ${result.nModified} modified`)

            res.status(200).json({ message: "Artists upserted successfully" })
        } catch (err) {
            console.error("Error upserting artists:", err)
            res.status(500).json({ error: "Failed to upsert artists" })
        }
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}
