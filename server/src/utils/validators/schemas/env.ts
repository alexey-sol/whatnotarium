import Joi from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION } from "#utils/const/nodeEnv";

export default Joi.object({
    HOST: Joi
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
        .required()
});
