import Joi from "@hapi/joi";

export default Joi.object({
    about: Joi
        .string()
        .optional()
        .empty("")
        .default(""),

    email: Joi
        .string(),

    name: Joi
        .string(),

    newPassword: Joi
        .string(),

    password: Joi
        .string()
});
