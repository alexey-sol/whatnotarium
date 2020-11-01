import Joi from "@hapi/joi";

export default Joi.object({
    fieldname: Joi
        .string()
        .valid("picture")
        .optional()
});
