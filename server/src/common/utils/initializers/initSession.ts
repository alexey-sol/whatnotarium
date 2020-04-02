import { RequestHandler } from "express";
import session from "express-session";

import initRedisClient from "utils/initializers/initRedisClient";
import sessionConfig from "config/session";

type InitSession = () => RequestHandler;

const initSession: InitSession = function (): RequestHandler {
    return session(getSessionOptions());
};

export default initSession;

function getSessionOptions (): session.SessionOptions {
    const { name, secret } = sessionConfig;

    return {
        cookie: {
            expires: getDateAfterMonthsPassedFromNow(1),
            maxAge: calculateMsInMonths(1),
            secure: "auto" // TODO: switch to "true" after enabling https
        },
        name,
        resave: false,
        saveUninitialized: true,
        secret,
        store: initRedisClient(session)
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
