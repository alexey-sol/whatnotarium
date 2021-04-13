import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string()
        .required(),

    isApproved: Joi
        .any()
        .forbidden(),

    isFrozen: Joi
        .any()
        .forbidden(),

    skipPremoderation: Joi
        .boolean()
        .optional(),

    title: Joi
        .string()
        .required(),

    userId: Joi
        .number()
        .required()
});
