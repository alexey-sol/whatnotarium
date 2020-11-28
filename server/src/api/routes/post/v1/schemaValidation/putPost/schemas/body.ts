import Joi from "@hapi/joi";

export default Joi.object({
    body: Joi
        .string(),

    likeCount: Joi
        .number(),

    title: Joi
        .string()
});
