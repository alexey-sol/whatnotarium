import Joi from "@hapi/joi";

export default Joi.object({
    searchTerm: Joi
        .string()
        .allow("")
});
