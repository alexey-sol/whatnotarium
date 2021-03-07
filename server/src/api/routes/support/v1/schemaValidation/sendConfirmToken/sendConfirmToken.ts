import { RequestHandler } from "express";

import querySchema from "./schemas/query";

const sendConfirmToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { error, value } = querySchema.validate(request.query);

    if (error) {
        return next(error);
    }

    request.query = value;
    next();
};

export default sendConfirmToken;
