import { RequestHandler } from "express";

import paramsSchema from "./schemas/params";

const getPost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    const { error } = paramsSchema.validate(params);

    if (error) {
        return next(error);
    }

    next();
};

export default getPost;
