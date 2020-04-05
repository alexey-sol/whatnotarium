import Joi from "@hapi/joi";

export default Joi.object({
    id: Joi
        .number()
        .required()
});
