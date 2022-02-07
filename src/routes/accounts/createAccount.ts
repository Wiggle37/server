import { Router } from "express";
import { initUser } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const logger: Logger = new Logger("createAccount");
const _router: Router = Router();

export const name = "createAccount";
export const router = _router.post("/", async (req, res) => {
    await initUser(req.body).then((response) => {
        res.send({ response: response });
    }).catch((err) => {
        res.send({ response: err });
        logger.error(`Error excecuting 'createAccount':\nStatus: ${err.status}\nError: ${err.error}`);
    });
});