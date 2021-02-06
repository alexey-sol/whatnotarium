import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string()
        .required(),

    isApproved: Joi
        .any()
        .forbidden(),

    title: Joi
        .string()
        .required(),

    userId: Joi
        .number()
        .required()
});
