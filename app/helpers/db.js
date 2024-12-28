import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sound-stash.h9go3.mongodb.net/`;
const client = new MongoClient(uri);

let db;

export const connectToDatabase = async () => {
    if (!db) {
        try {
            await client.connect()
            db = client.db("sound-stash")
            console.log("Connected to MongoDB")
        } catch (err) {
            console.error("Error connecting to MongoDB:", err)
            throw err
        }
    }

    return database
}

export const upsertArtist = async (artist) => {
    const db = await connectToDatabase()
    const collection = db.collection("artists")

    try {
        await collection.updateOne(
            { name: artist.name },
            { $set: artist },
            { upsert: true }
        )
        console.log(`Artist ${artist.name} upserted successfully`)
    } catch (err) {
        console.error("Error upserting artist:", err)
    }
}
