import Joi from "@hapi/joi";

export default Joi.object({
    provider: Joi
        .string()
        .required()
});
