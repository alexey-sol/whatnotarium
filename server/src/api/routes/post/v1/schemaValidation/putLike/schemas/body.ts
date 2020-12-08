import Joi from "@hapi/joi";

export default Joi.object({
    dislikeValue: Joi
        .string()
        .optional(),

    likeValue: Joi
        .string()
        .optional()
});
