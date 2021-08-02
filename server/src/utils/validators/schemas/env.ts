import Joi from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION } from "#utils/const/nodeEnv";

export default Joi.object({
    CACHE_STORE_HOST: Joi
        .string()
        .required(),

    CACHE_STORE_PORT: Joi
        .number()
        .required(),

    DATABASE_DB: Joi
        .string()
        .required(),

    DATABASE_DB_TEST: Joi
        .string()
        .required(),

    DATABASE_HOST: Joi
        .string()
        .required(),

    DATABASE_PASSWORD: Joi
        .string()
        .required(),

    DATABASE_PORT: Joi
        .string()
        .required(),

    DATABASE_USER: Joi
        .string()
        .required(),

    EMAIL_TRANSPORTER_API_KEY: Joi
        .string()
        .required(),

    GOOGLE_CLIENT_ID: Joi
        .string()
        .required(),

    GOOGLE_CLIENT_SECRET: Joi
        .string()
        .required(),

    GOOGLE_OAUTH_REDIRECT_URI: Joi
        .string()
        .required(),

    NODE_ENV: Joi
        .string()
        .trim()
        .valid(DEVELOPMENT, PRODUCTION)
        .required(),

    PROJECT_NAME_FULL: Joi
        .string()
        .required(),

    PROJECT_NAME_SHORT: Joi
        .string()
        .required(),

    SENDER_EMAIL: Joi
        .string()
        .required(),

    SERVER_PORT: Joi
        .number()
        .required(),

    SERVER_PORT_EXTERNAL: Joi
        .number()
        .required(),

    SESSION_NAME: Joi
        .string()
        .required(),

    SESSION_SECRET: Joi
        .string()
        .required(),

    YANDEX_CLIENT_ID: Joi
        .string()
        .required(),

    YANDEX_CLIENT_SECRET: Joi
        .string()
        .required()
});
