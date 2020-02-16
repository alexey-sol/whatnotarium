import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";

const createUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateBody(request.body);

    if (error) {
        return next(error);
    }

    User.create(value)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default createUser;

function validateBody (
    body: Indexer<unknown>
): ValidationResult {
    const bodyValidator = new PropsValidator(body);

    return bodyValidator.validate(
        [EMAIL, true],
        [NAME, true],
        [PASSWORD, true]
    );
}
