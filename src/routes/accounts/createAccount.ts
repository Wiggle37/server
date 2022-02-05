import { Router } from "express";
import { initUser } from "../../database/functions/accounts";

const _router: Router = Router();

export const name: string = "createAccount"
export const router = _router.post("/", async (req, res) => {
    await initUser(req.body).then((response) => {
        res.send({ response: response })
    }).catch((err) => {
        res.send({ response: err });
    });
});