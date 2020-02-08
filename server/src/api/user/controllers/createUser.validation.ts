import { string } from "@hapi/joi";

export default {
    email: string().email({
        minDomainSegments: 2
    }).required(),

    name: string().min(3).max(30).required(),

    password: string().min(6).required()
};
