import { ValidationError, ValidationResult } from "@hapi/joi";
import session from "express-session";

import { SESSION_SECRET } from "constants/env";
import EnvForSession from "types/env/EnvForSession";
import PropsValidator from "utils/PropsValidator";
import createRedisClient from "utils/createRedisClient";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const createSession = function (): any {
    const { error, value } = validateEnvForSessionVars();

    if (error) {
        logErrorAndTerminateProcess(error);
    }

    return (): Function => session(getSessionOptions(value));
};

export default createSession;

function validateEnvForSessionVars (): ValidationResult {
    const envValidator = new PropsValidator(process.env);
    return envValidator.validate(SESSION_SECRET);
}

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
}

function getSessionOptions (
    env: EnvForSession
): session.SessionOptions {
    return {
        cookie: {
            expires: getDateAfterMonthsPassedFromNow(1),
            maxAge: calculateMsInMonths(1),
            secure: "auto" // TODO: switch to "true" after enabling https
        },
        name: "geek-regime.sid",
        resave: false,
        saveUninitialized: true,
        secret: env.SESSION_SECRET,
        store: createRedisClient(session)
    };
}

function getDateAfterMonthsPassedFromNow (
    months: number
): Date {
    return new Date(Date.now() + calculateMsInMonths(months));
}

function calculateMsInMonths (
    months: number
): number {
    return 1000 * 60 * 60 * 24 * 30 * months;
}
