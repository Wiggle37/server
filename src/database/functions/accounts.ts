import { Collection } from "mongodb";
import { getDatabase } from "../database";

async function getCollection(): Promise<Collection> {
    const _database = await getDatabase();
    return _database.collection("accounts");
}

export async function checkForUser(email: string): Promise<boolean>  {
    const database = await getCollection();

    return await database.findOne({ email: email }).catch(() => { return 500 }) != null;
}

export async function initUser(data) {
    const database = await getCollection();
    if (await checkForUser(data.email)) return 409;

    await database.insertOne(data).catch(() => { return 500; });
}

export async function getUserData(email: string) {
    const database = await getCollection();
    if (!await checkForUser(email)) return 404;

    const data = await database.findOne({ email: email }).catch(() => { return 500; });
    return [ data, 200 ];
}

export async function deleteUser(email: string) {
    const database = await getCollection();
    if (!await checkForUser(email)) return 404;

    await database.deleteOne({ email: email }).catch(() => { return 500; });
    return 200;
}