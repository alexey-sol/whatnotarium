import Joi from "@hapi/joi";

export default Joi.object({
    token: Joi
        .string()
        .required()
});
