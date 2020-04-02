import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { CURRENT_PASSWORD, EMAIL } from "@const/fieldNames";
import { INVALID_CREDENTIALS } from "@const/validationErrors";
import ApiController from "@common/types/ApiController";
import Indexer from "@common/types/Indexer";
import PropsValidator from "@common/utils/PropsValidator";
import RequestSession from "@common/utils/helpers/RequestSession";
import User from "@user/model";
import ValidationError from "@common/errors/ValidationError";
import isValidPassword from "@common/utils/helpers/isValidPassword";
import sendResponse from "@common/utils/helpers/sendResponse";

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
