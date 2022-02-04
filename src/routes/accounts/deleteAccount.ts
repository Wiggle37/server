import { Router } from "express";
import { v4 as uuid } from "uuid";
import { deleteUser } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const _router: Router = Router();
const logger: Logger = new Logger("deleteAccount");

export const name: string = "deleteAccount";
export const router = _router.delete("/", async (req, res) => {
    const response = await deleteUser(req.query.email);
    if (response == 200) return res.send({ response: "User deleted successfully..." });
    else if (response == 404) return res.status(response).send({ response: "User not found..." });
    else if (response == 500) {
        const UUID: uuid = uuid();
        logger.error(`Error in createAcount with UUID of "${UUID}"`)
        return res.status(response).send({ response: "Something went wrong... Please use the provided UUID to track the error", UUID: `${UUID}` });
    }
});