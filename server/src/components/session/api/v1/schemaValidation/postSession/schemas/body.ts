import Joi from "@hapi/joi";

export default Joi.object({
    currentPassword: Joi
        .string()
        .required(),

    email: Joi
        .string()
        .email({ minDomainSegments: 2 })
        .required()
});
