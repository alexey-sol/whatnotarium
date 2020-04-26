import Joi from "@hapi/joi";

import { DEVELOPMENT, PRODUCTION, TEST } from "#utils/const/nodeEnv";

export default Joi.object({
    NODE_ENV: Joi
        .string()
        .trim()
        .valid(DEVELOPMENT, PRODUCTION, TEST)
        .required(),

    POSTGRES_URL_TEST: Joi
        .string()
        .required()
});
