import { Router } from "express";
import { getUserData } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const logger: Logger = new Logger("getAccount");
const _router: Router = Router();

export const name = "getAccount";
export const router = _router.get("/:email", async (req, res) => {
    await getUserData(req.params.email).then((response) => {
        res.send({ response: response });
    }).catch((err) => {
        res.send({ response: err });
        logger.error(`Error excecuting 'getAccount':\nStatus: ${err.status}\nError: ${err.error}`);
    });
    
});