import Joi from "@hapi/joi";

export default {
    HOST: Joi.string().min(3).required().trim(),

    NODE_ENV: Joi.string().required().trim().valid(
        "development",
        "production",
        "test"
    ),

    PG_DATABASE_DEV: Joi.string().min(3).required().trim(),

    PG_DATABASE_PROD: Joi.string().min(3).required().trim(),

    PG_HOST: Joi.string().min(3).required().trim(),

    PG_PASSWORD: Joi.string().min(6).required().trim(),

    PG_PORT: Joi.number().required(),

    PG_USER: Joi.string().alphanum().min(3).max(30).required(),

    PORT: Joi.number().required(),

    SESSION_SECRET: Joi.string().min(3).required().trim(),

    URL: Joi.string().min(8).required().trim()
};
