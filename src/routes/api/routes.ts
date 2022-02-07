import { Router } from "express";
import { Logger } from "../../lib/Logger";
import { routes } from "../../server";

const logger: Logger = new Logger("routes");
const _router: Router = Router(); 

export const name = "routes";
export const router = _router.get("/", async (req, res) => {
    const _routes: { name: string; path: object; }[] = [];
    routes.forEach((value, key) => {
        _routes.push({
            name: key,
            path: value
        });
    });

    res.send({
        response: _routes
    });
    logger.debug("Excecuted 'routes' without error");
});