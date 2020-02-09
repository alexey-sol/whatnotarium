import { number, string } from "@hapi/joi";

export default {
    HOST: string().min(3).required().trim(),

    NODE_ENV: string().required().trim().valid(
        "development",
        "production",
        "test"
    ),

    PG_DATABASE: string().min(3).required().trim(),

    PG_DATABASE_DEV: string().min(3).required().trim(),

    PG_HOST: string().min(3).required().trim(),

    PG_PASSWORD: string().min(6).required().trim(),

    PG_PORT: number().required(),

    PG_USER: string().alphanum().min(3).max(30).required(),

    PORT: number().required(),

    SESSION_SECRET: string().min(3).required().trim(),

    URL: string().min(8).required().trim()
};
