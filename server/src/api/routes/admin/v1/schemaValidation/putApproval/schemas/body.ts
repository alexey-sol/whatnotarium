import Joi from "@hapi/joi";

import { APPROVED, NOT_APPROVED } from "#utils/const/postStatuses";

export default Joi.object({
    status: Joi
        .string()
        .valid(APPROVED, NOT_APPROVED)
        .required()
});
