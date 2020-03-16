import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { ID } from "constants/fieldNames";
import { NO_USER_FOUND } from "constants/validationErrors";
import ApiController from "types/ApiController";
import HashOptions from "models/HashOptions";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "models/User";
import ValidationError from "utils/errors/ValidationError";
import sendResponse from "utils/sendResponse";

const deleteUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateParams(request.params);

    if (error) {
        return next(error);
    }

    try {
        const { id: userId } = value;
        const user = await User.findById(userId);

        if (!user) {
            throw new ValidationError(NO_USER_FOUND, 404);
        }

        const { hashOptionsId } = user;
        const result = await User.destroyById(userId);
        await HashOptions.destroyById(hashOptionsId);

        sendResponse(response, result);
    } catch (error) {
        next(error);
    }
};

export default deleteUser;

function validateParams (
    params: Indexer<unknown>
): Joi.ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}
