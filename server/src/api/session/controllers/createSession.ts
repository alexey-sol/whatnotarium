import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, PASSWORD } from "constants/fieldNames";
import { INVALID_CREDENTIALS, NO_USER_FOUND } from "constants/validationErrors";
import { USERS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import ValidationError from "utils/errors/ValidationError";
import hashPassword from "utils/hashPassword";
import sendResponse from "utils/sendResponse";
import sessionConfig from "config/session";

const createSession: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateBody(request.body);

    if (error) {
        return next(error);
    }

    const { name } = sessionConfig;
    const { email, password } = value;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return next(new ValidationError(
                NO_USER_FOUND,
                404,
                request.ip
            ));
        }

        if (!isValidPassword(password, user.password as Buffer)) {
            return next(new ValidationError(
                INVALID_CREDENTIALS,
                401,
                request.ip
            ));
        }

        const isAlreadySignIn = (
            request.session &&
            request.session.user &&
            request.cookies &&
            request.cookies[name]
        );

        if (!isAlreadySignIn) {
            // "request.session" and "user" were checked but the compiler still
            // complains, so... bang!
            request.session!.user = user!.id;
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
        [PASSWORD, true]
    );
}

async function findUserByEmail (
    email: string
): Promise<BaseModel | null> {
    const users = await BaseModel.find(USERS, { email });
    return users[0];
}

function isValidPassword (
    passwordToCheck: string,
    storedHash: Buffer
): boolean {
    const { hash } = hashPassword(passwordToCheck);
    return hash === storedHash;
}
