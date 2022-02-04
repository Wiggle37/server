import { Router } from "express";
import { v4 as uuid } from "uuid";
import { initUser } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const _router: Router = Router();
const logger: Logger = new Logger("createAccount");

export const name: string = "createAccount"
export const router = _router.post("/", async (req, res) => {
    const response = await initUser(req.query)
    if (response == 200) return res.send({ response: "User created successfully..." });
    else if (response == 409) return res.status(response).send({ response: "User already exists..." });
    else if (response == 500) {
        const UUID: uuid = uuid();
        logger.error(`Error in createAcount with UUID of "${UUID}"`)
        return res.status(response).send({ response: "Something went wrong... Please use the provided UUID to track the error", UUID: `${UUID}` });
    }
});