import { RequestHandler } from "express";

import bodySchema from "./schemas/body";

const sendConfirmToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { error, value } = bodySchema.validate(request.body);

    if (error) {
        return next(error);
    }

    request.body = value;
    next();
};

export default sendConfirmToken;
