import { RequestHandler } from "express";

import bodySchema from "./schemas/body";
import paramsSchema from "./schemas/params";

const putUser: RequestHandler = async function (
    { body, params },
    response,
    next
): Promise<void> {
    const {
        error: bodyError
    } = bodySchema.validate(body);

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
