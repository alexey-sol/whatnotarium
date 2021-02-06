import Joi from "@hapi/joi";

export default Joi.object({
    about: Joi
        .string()
        .optional()
        .empty("")
        .default(""),

    email: Joi
        .string(),

    isConfirmed: Joi
        .any()
        .forbidden(),

    name: Joi
        .string(),

    newPassword: Joi
        .string(),

    password: Joi
        .string()
});
