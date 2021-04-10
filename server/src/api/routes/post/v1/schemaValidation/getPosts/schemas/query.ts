import Joi from "@hapi/joi";

export default Joi.object({
    count: Joi
        .number()
        .optional(),

    operators: Joi
        .object()
        .optional(),

    page: Joi
        .number()
        .optional(),

    where: Joi
        .object()
        .optional()
});
