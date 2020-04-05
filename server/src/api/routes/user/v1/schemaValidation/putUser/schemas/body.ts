import Joi from "@hapi/joi";

export default Joi.object({
    currentPassword: Joi
        .string(),

    email: Joi
        .string()
        .email({ minDomainSegments: 2 }),

    name: Joi
        .string()
        .min(3)
        .max(30),

    newPassword: Joi
        .string()
        .min(6),

    password: Joi
        .string()
        .min(6)
});
