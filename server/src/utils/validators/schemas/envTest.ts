import Joi from "@hapi/joi";

import { TEST } from "#utils/const/nodeEnv";

export default Joi.object({
    NODE_ENV: Joi
        .string()
        .trim()
        .valid(TEST)
        .required(),

    POSTGRES_URL_TEST: Joi
        .string()
        .required()
});
