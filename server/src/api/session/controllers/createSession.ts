import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { CURRENT_PASSWORD, EMAIL } from "constants/fieldNames";
import { INVALID_CREDENTIALS } from "constants/validationErrors";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import RequestSession from "utils/RequestSession";
import User from "models/User";
import ValidationError from "utils/errors/ValidationError";
import isValidPassword from "utils/isValidPassword";
import sendResponse from "utils/sendResponse";

const createSession: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateBody(request.body);

    if (error) {
        return next(error);
    }

    const { currentPassword, email } = value;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return next(new ValidationError(
                INVALID_CREDENTIALS,
                401,
                request.ip
            ));
        }

        const passwordIsValid = await isValidPassword(currentPassword, user);

        if (!passwordIsValid) {
            return next(new ValidationError(
                INVALID_CREDENTIALS,
                401,
                request.ip
            ));
        }

        const session = new RequestSession(request);

        if (!session.userIsSignedIn()) {
            session.assignUserToSession(user);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default createSession;

function validateBody (
    body: Indexer<unknown>
): Joi.ValidationResult {
    const bodyValidator = new PropsValidator(body);

    return bodyValidator.validate(
        [EMAIL, true],
        [CURRENT_PASSWORD, true]
    );
}

async function findUserByEmail (
    email: string
): Promise<User | null> {
    const user = await User.findOne({ email });
    return user;
}
