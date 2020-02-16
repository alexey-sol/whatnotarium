import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "@hapi/joi";

import { ID } from "constants/fieldNames";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";
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

    User.destroyById(value.id)
        .then(result => sendResponse(response, result))
        .catch(next);
};

export default deleteUser;

function validateParams (
    params: Indexer<unknown>
): ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}
