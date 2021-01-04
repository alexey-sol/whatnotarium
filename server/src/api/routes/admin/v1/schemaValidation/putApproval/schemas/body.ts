import Joi from "@hapi/joi";

export default Joi.object({
    isApproved: Joi
        .boolean()
        .required()
});
