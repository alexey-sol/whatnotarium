import Joi from "@hapi/joi";

import ProcessManager from "#utils/helpers/ProcessManager";
import databaseConfig from "./database";
import redisConfig from "./redis";
import serverConfig from "./server";
import sessionConfig from "./session";
import validateEnv from "#utils/validators/validateEnv";

const { error, value } = validateEnv();

if (error) {
    logErrorAndExit(error);
}

export default {
    database: databaseConfig(value),
    redis: redisConfig(value),
    server: serverConfig(value),
    session: sessionConfig(value)
};

function logErrorAndExit (error: Joi.ValidationError): void {
    new ProcessManager().exit(error);
}
