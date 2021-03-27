import Joi from "@hapi/joi";

export default Joi.object({
    newPassword: Joi
        .string()
        .required(),

    token: Joi
        .string()
        .required()
});
