import Joi from "@hapi/joi";

export default Joi.object({
    userId: Joi
        .number()
        .required(),

    value: Joi
        .number()
        .required()
});
