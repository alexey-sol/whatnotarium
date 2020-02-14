import { number, string } from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION } from "constants/nodeEnv";

export default {
    HOST: string()
        .min(3)
        .trim(),

    NODE_ENV: string()
        .trim()
        .valid(DEVELOPMENT, PRODUCTION),

    PG_URL: string()
        .min(8)
        .trim(),

    PG_URL_DEV: string()
        .min(8)
        .trim(),

    PORT: number()
        .required(),

    REDIS_HOST: string()
        .min(3)
        .trim(),

    REDIS_PORT: number(),

    SESSION_SECRET: string()
        .min(3)
        .trim(),

    URL: string()
        .min(8)
        .trim()
};
