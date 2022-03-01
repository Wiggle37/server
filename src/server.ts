/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from "fs";
import * as path from "path";
import express from "express";
import cors from "cors";
import { connect, disconnect } from "./database/database";
import { Logger } from "./lib/logger";
import dotenv from "dotenv";
dotenv.config();

const startTimer: number = Date.now();
export const routes = new Map<string, object>();

const port = process.env.PORT || 3000;
const logger: Logger = new Logger("server");

logger.info("Creating express server...");
const app = express();

app.use(cors());
app.use(express.json());

logger.info("Loading routes...");
let routeCount = 0;
for (const file of fs.readdirSync(path.resolve(__dirname, "./routes"))) {
    const routeList = [];
    for (const endpoint of fs.readdirSync(path.resolve(__dirname, `./routes/${file}`))) {
        if (!endpoint.endsWith(".js")) continue;
        const _endpoint = require(`./routes/${file}/${endpoint}`);
        if (_endpoint.name == undefined || _endpoint.router == undefined) {
            logger.warn(`Route file "${endpoint}" skipped loading due to a missing name/router export`);
            continue;
        }

        app.use(`/${file}/${_endpoint.name}/`, _endpoint.router);
        routeList.push({
            name: _endpoint.name,
            path: `/${file}/${_endpoint.name}/`
        });
        logger.debug(`Loaded route "/${file}/${_endpoint.name}/"`);
        routeCount++;
    }
    routes.set(file.toString(), routeList);
}

app.get("/", (req, res) => {
    res.send({
        response: "Please provide a valid endpoint!"
    });
});

app.listen(port, async () => {
    try {
        await connect();
        logger.info(`Server running on http://localhost:${port}`);
        logger.debug(`Loaded ${routeCount} routes in ${Date.now() - startTimer}ms`);

    } catch (err) {
        logger.fatal(`There was an error while running the server:\n${err}`);
        logger.debug("Closing Mongo Server...");
        await disconnect();
        process.exit(1);
    }
});