import Joi from "@hapi/joi";

export default Joi.object({
    email: Joi
        .string()
        .required(),

    isConfirmed: Joi
        .any()
        .forbidden(),

    name: Joi
        .string()
        .required(),

    password: Joi
        .string()
        .required()
});
