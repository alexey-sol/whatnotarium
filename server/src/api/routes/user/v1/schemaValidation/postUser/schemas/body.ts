import Joi from "@hapi/joi";

export default Joi.object({
    email: Joi
        .string()
        .required(),

    name: Joi
        .string()
        .required(),

    password: Joi
        .string()
        .required()
});
