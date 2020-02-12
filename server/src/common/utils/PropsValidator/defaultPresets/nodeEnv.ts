import { number, string } from "@hapi/joi";

export default {
    HOST: string().min(3).required().trim(),

    NODE_ENV: string().required().trim().valid(
        "development",
        "production",
        "test"
    ),

    PG_URL: string().min(8).required().trim(),

    PG_URL_DEV: string().min(8).required().trim(),

    PORT: number().required(),

    REDIS_HOST: string().min(3).required().trim(),

    REDIS_PORT: number().required(),

    SESSION_SECRET: string().min(3).required().trim(),

    URL: string().min(8).required().trim()
};
