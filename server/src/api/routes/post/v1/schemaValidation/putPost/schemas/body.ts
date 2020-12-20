import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string(),

    title: Joi
        .string()
});
