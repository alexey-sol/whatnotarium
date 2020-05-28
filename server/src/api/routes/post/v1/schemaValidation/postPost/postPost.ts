import { RequestHandler } from "express";

import bodySchema from "./schemas/body";

const postPost: RequestHandler = async (
    { body },
    response,
    next
): Promise<void> => {
    const { error } = bodySchema.validate(body);

    if (error) {
        return next(error);
    }

    next();
};

export default postPost;
