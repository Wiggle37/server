import { Router } from "express";
import { getUserData } from "../../database/functions/accounts";

const _router: Router = Router();

export const name: string = "getAccount";
export const router = _router.get("/:email", async (req, res) => {
    await getUserData(req.params.email).then((response) => {
        res.send({ response: response });
    }).catch((err) => {
        res.send({ response: err })
    });
    
});