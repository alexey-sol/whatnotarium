import Joi from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION } from "const/nodeEnv";

export default Joi.object({
    HOST: Joi
        .string()
        .min(3)
        .trim()
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
        .min(8)
        .trim()
        .required(),

    REDIS_HOST: Joi
        .string()
        .min(3)
        .trim()
        .required(),

    REDIS_PORT: Joi
        .number()
        .required(),

    SESSION_NAME: Joi
        .string()
        .min(3)
        .trim()
        .required(),

    SESSION_SECRET: Joi
        .string()
        .min(3)
        .trim()
        .required(),

    URL: Joi
        .string()
        .min(8)
        .trim()
        .required()
});
