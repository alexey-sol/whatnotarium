import { RequestHandler } from "express";

import bodySchema from "./schemas/body";
import paramsSchema from "./schemas/params";

const putUser: RequestHandler = async (
    { body, files, params },
    response,
    next
): Promise<void> => {
    const {
        error: bodyError
    } = bodySchema.validate(body, { stripUnknown: true });

    if (bodyError) {
        return next(bodyError);
    }

    const {
        error: paramsError
    } = paramsSchema.validate(params);

    if (paramsError) {
        return next(paramsError);
    }

    next();
};

export default putUser;
