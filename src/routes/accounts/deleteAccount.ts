import { Router } from "express";
import { deleteUser } from "../../database/functions/accounts";
import { Logger } from "../../lib/Logger";

const logger: Logger = new Logger("deleteAccount");
const _router: Router = Router();

export const name = "deleteAccount";
export const router = _router.delete("/", async (req, res) => {
    await deleteUser(req.body.email).then((response) => {
        res.send({ response: response });
    }).catch((err) => {
        res.send({ response: err });
        logger.error(`Error excecuting 'deleteAccount':\nStatus: ${err.status}\nError: ${err.error}`);
    });
});