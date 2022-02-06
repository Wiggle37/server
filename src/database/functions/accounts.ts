/* eslint-disable no-async-promise-executor */
import { Collection } from "mongodb";
import { getDatabase } from "../database";
import { Account } from "../types/account";

async function getCollection() : Promise<Collection> {
    const db = await getDatabase();

    return new Promise(async (resolve) => {
        resolve(db.collection("accounts"));
    });
}

export async function checkForUser(email: string) : Promise<boolean> {
    const database = await getCollection();

    return new Promise(async (resolve, reject) => {
        await database.findOne({ email: email }).then((value) => {
            resolve(value != null);
        }).catch((err) => {
            reject(err);
        });
    });
}

export async function initUser(data: Account) : Promise<number> {
    const database = await getCollection();

    return new Promise(async (resolve, reject) => {
        if (await checkForUser(data.email)) return reject({ status: 500, error: `User with email '${data.email}' already exists!` });
        if (data.email || data.phoneNumber || data.firstName || data.lastName || data.password == (undefined)) return reject({ status: 500, error: "Data object missing item!" });
        await database.insertOne(data).then(() => {
            resolve(200);
        }).catch((err) => {
            reject({ status: 500, error: err });
        });
    });
}

export async function getUserData(email: string) : Promise<unknown> {
    const database = await getCollection();

    return new Promise(async (resolve, reject) => {
        if (!await checkForUser(email)) return reject({ status: 404, error: `User with email '${email}' not found!` });
        await database.findOne({ email: email }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject({ status: 500, error: err });
        });
    });
}

export async function deleteUser(email: string) : Promise<object> {
    const database = await getCollection();

    return new Promise(async (resolve, reject) => {
        if (!await checkForUser(email)) return reject({ status: 404, error: `User with email '${email}' not found!` });
        await database.deleteOne({ email: email }).then(() => {
            resolve({ status: 200 });
        }).catch((err) => {
            reject({ status: 500, error: err });
        });
    });
}