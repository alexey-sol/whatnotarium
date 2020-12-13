import Joi from "@hapi/joi";

export default Joi.object({
    value: Joi
        .number()
        .required()
});
