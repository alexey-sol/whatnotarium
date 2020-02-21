import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "models/User";
import hashPassword from "utils/hashPassword";
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

    const { password } = value;
    const { hash } = hashPassword(password, "sha512");

    const props = {
        ...value,
        password: hash
    };

    User.create(props)
        .then(user => sendResponse(response, user))
        .catch(next);
    // TODO: email verification
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
