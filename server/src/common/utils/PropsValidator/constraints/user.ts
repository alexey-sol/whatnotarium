import { string } from "@hapi/joi";

const passwordConstraints = string()
    .min(6);

export default {
    currentPassword: string(),

    email: string()
        .email({ minDomainSegments: 2 }),

    name: string()
        .min(3)
        .max(30),

    newPassword: passwordConstraints,

    password: passwordConstraints
};
