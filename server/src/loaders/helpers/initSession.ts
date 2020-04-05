import { RequestHandler } from "express";
import session from "express-session";

import config from "#config";
import initRedisStore from "./initRedisStore";

export default function (): RequestHandler {
    return session(getSessionOptions());
}

function getSessionOptions (): session.SessionOptions {
    const { name, secret } = config.session;

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
        store: initRedisStore(session)
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
