import { Router } from "express";
import { v4 as uuid } from "uuid";
import { getUserData } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const _router: Router = Router();
const logger: Logger = new Logger("getAccount");

export const name: string = "getAccount";
export const router = _router.get("/:email", async (req, res) => {
    const response = await getUserData(req.params.email);
    if (response[1] == 200) return res.status(200).send({ response: response[0] });
    else if (response[1] == 404) return res.status(404).send({ response: "User not found..." })
    else if (response[1] == 500) {
        const UUID: uuid = uuid();
        logger.error(`Error in createAcount with UUID of "${UUID}"`)
        return res.status(response).send({ response: "Something went wrong... Please use the provided UUID to track the error", UUID: `${UUID}` });
    }
});