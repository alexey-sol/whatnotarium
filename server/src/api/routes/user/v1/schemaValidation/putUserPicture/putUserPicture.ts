import { RequestHandler } from "express";

import fileSchema from "./schemas/file";
import paramsSchema from "./schemas/params";

const putUserPicture: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const {
        error: fileError
    } = fileSchema.validate(request.file, { stripUnknown: true });

    if (fileError) {
        return next(fileError);
    }

    const {
        error: paramsError,
        value: paramsValue
    } = paramsSchema.validate(request.params);

    if (paramsError) {
        return next(paramsError);
    }

    request.params = paramsValue;
    next();
};

export default putUserPicture;
