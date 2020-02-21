import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "@hapi/joi";

import { EMAIL, PASSWORD } from "constants/fieldNames";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import UnauthorizedError from "utils/errors/UnauthorizedError";
import User from "models/User";
import hashPassword from "utils/hashPassword";
import sendResponse from "utils/sendResponse";

const authenticate: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateBody(request.body);

    if (error) {
        return next(error);
    }

    try {
        const { email, password } = value;
        const user = await findUserByEmail(email);

        const isAuthorized = Boolean(
            request.session &&
            user &&
            isValidPassword(password, user.password as Buffer)
        );

        if (!isAuthorized) {
            return next(new UnauthorizedError());
        }

        // "request.session" and "user" were checked but the compiler still
        // complains, so... bang!
        request.session!.user = user!.id;
        sendResponse(response);
    } catch (error) {
        return next(error);
    }
};

export default authenticate;

function validateBody (
    body: Indexer<unknown>
): ValidationResult {
    const bodyValidator = new PropsValidator(body);

    return bodyValidator.validate(
        [EMAIL, true],
        [PASSWORD, true]
    );
}

async function findUserByEmail (
    email: string
): Promise<User | null> {
    const users = await User.find({ email });
    return users[0];
}

function isValidPassword (
    passwordToCheck: string,
    storedHash: Buffer
): boolean {
    const { hash } = hashPassword(passwordToCheck, "sha512");
    return hash === storedHash;
}
