import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "@hapi/joi";

import { ID } from "constants/fieldNames";
import ApiController from "types/ApiController";
import ObjectIndexer from "types/ObjectIndexer";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";

const getUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateParams(request.params);

    if (error) {
        return next(error);
    }

    User.findById(value.id)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getUser;

function validateParams (
    params: ObjectIndexer<unknown>
): ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}
