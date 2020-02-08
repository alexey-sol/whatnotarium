import Joi from "@hapi/joi";

export default {
    email: Joi.string().email({
        minDomainSegments: 2
    }),

    name: Joi.string().min(3).max(30),

    password: Joi.string().min(6)
};
