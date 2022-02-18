import * as path from "path";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const client: MongoClient = new MongoClient(process.env.MONGO_URI || "");

export async function connect() : void {
    client.connect();
}

export async function disconnect() : void {
    await client.close();
}

export async function getDatabase() {
    client.connect();
    
    const database = client.db("website");
    return database;
}
