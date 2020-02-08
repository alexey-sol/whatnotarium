import { string } from "@hapi/joi";

export default {
    email: string().email({
        minDomainSegments: 2
    }),

    name: string().min(3).max(30),

    password: string().min(6)
};
