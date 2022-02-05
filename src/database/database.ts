import * as path from "path";
import { MongoClient } from "mongodb";

const envPath = path.resolve(__dirname, "../.env")
require("dotenv").config({ path: envPath });

const client: MongoClient = new MongoClient(process.env.MONGO_URI || "");

export async function connect() {
    client.connect();
}

export async function disconnect() {
    await client.close();
}

export async function getDatabase() {
    client.connect();
    
    const database = client.db("website")
    return database;
}