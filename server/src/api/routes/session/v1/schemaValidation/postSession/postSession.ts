import { RequestHandler } from "express";

import bodySchema from "./schemas/body";

const postUser: RequestHandler = async function (
    { body },
    response,
    next
): Promise<void> {
    const { error } = bodySchema.validate(body);

    if (error) {
        return next(error);
    }

    next();
};

export default postUser;
