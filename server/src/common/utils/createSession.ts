import session from "express-session";

import createRedisClient from "utils/createRedisClient";
import sessionConfig from "config/session";

const createSession = function (): any {
    const { secret } = sessionConfig;
    return session(getSessionOptions(secret));
};

export default createSession;

function getSessionOptions (
    secret: string | string[]
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
        secret,
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
