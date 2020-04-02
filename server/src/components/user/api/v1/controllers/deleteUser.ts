import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { ID } from "@const/fieldNames";
import { NO_USER_FOUND } from "@const/validationErrors";
import ApiController from "@common/types/ApiController";
import HashOptions from "@hashOptions/model";
import Indexer from "@common/types/Indexer";
import PropsValidator from "@common/utils/PropsValidator";
import User from "@user/model";
import ValidationError from "@common/errors/ValidationError";
import sendResponse from "@common/utils/helpers/sendResponse";

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
