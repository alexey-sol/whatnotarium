import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string()
        .required(),

    title: Joi
        .string()
        .required(),

    userId: Joi
        .number()
        .required()
});
