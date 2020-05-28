import Joi from "@hapi/joi";

export default Joi.object({
    limit: Joi
        .number(),

    offset: Joi
        .number(),

    userId: Joi
        .number()
});
