import { RequestHandler } from "express";

import querySchema from "./schemas/query";
import paramsSchema from "./schemas/params";

const resetPassword: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const {
        error: queryError,
        value: queryValue
    } = querySchema.validate(request.query, { stripUnknown: true });

    if (queryError) {
        return next(queryError);
    }

    const {
        error: paramsError,
        value: paramsValue
    } = paramsSchema.validate(request.params);

    if (paramsError) {
        return next(paramsError);
    }

    request.query = queryValue;
    request.params = paramsValue;
    next();
};

export default resetPassword;
