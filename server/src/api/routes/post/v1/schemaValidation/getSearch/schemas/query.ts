import Joi from "@hapi/joi";

export default Joi.object({
    count: Joi
        .number()
        .optional(),

    page: Joi
        .number()
        .optional(),

    searchTerm: Joi
        .string()
        .allow("")
});
