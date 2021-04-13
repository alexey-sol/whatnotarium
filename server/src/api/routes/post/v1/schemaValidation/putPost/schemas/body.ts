import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string(),

    isApproved: Joi
        .any()
        .forbidden(),

    isFrozen: Joi
        .any()
        .forbidden(),

    title: Joi
        .string(),

    viewCount: Joi
        .number()
});
