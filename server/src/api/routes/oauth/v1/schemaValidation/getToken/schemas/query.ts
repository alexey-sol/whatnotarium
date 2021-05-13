import Joi from "@hapi/joi";

export default Joi.object({
    code: Joi
        .string()
        .required()
});
