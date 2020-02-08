import Joi from "@hapi/joi";

export default {
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),

    name: Joi.string().min(3).max(30).required(),

    password: Joi.string().min(6).required()
};
