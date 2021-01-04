import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string(),

    status: Joi
        .any()
        .forbidden(),

    title: Joi
        .string(),

    viewCount: Joi
        .number()
});
