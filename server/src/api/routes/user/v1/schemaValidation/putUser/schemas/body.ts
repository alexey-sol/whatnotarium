import Joi from "@hapi/joi";

export default Joi.object({
    email: Joi
        .string(),

    name: Joi
        .string(),

    newPassword: Joi
        .string(),

    password: Joi
        .string()
});
