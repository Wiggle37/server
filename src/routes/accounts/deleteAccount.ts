import { Router } from "express";
import { deleteUser } from "../../database/functions/accounts";

const _router: Router = Router();

export const name: string = "deleteAccount";
export const router = _router.delete("/", async (req, res) => {
    await deleteUser(req.body.email).then((response) => {
        res.send({ response: response })
    }).catch((err) => {
        res.send({ response: err });
    });
});