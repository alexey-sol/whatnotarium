import { RequestHandler } from "express";

import bodySchema from "./schemas/body";
import paramsSchema from "./schemas/params";

const putApproval: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const {
        error: bodyError,
        value: bodyValue
    } = bodySchema.validate(request.body);

    if (bodyError) {
        return next(bodyError);
    }

    const {
        error: paramsError,
        value: paramsValue
    } = paramsSchema.validate(request.params);

    if (paramsError) {
        return next(paramsError);
    }

    request.body = bodyValue;
    request.params = paramsValue;
    next();
};

export default putApproval;
