import Joi from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION } from "#utils/const/nodeEnv";

export default Joi.object({
    HOST: Joi
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

    PORT: Joi
        .number()
        .required(),

    POSTGRES_URL: Joi
        .string()
        .required(),

    PROJECT_NAME_FULL: Joi
        .string()
        .required(),

    PROJECT_NAME_SHORT: Joi
        .string()
        .required(),

    REDIS_HOST: Joi
        .string()
        .required(),

    REDIS_PORT: Joi
        .number()
        .required(),

    SENDER_EMAIL: Joi
        .string()
        .required(),

    SENDGRID_API_KEY: Joi
        .string()
        .required(),

    SESSION_NAME: Joi
        .string()
        .required(),

    SESSION_SECRET: Joi
        .string()
        .required(),

    URL: Joi
        .string()
        .required(),

    YANDEX_CLIENT_ID: Joi
        .string()
        .required(),

    YANDEX_CLIENT_SECRET: Joi
        .string()
        .required()
});
