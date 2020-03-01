import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import {
    INVALID_CREDENTIALS,
    NO_USER_FOUND
} from "constants/validationErrors";

import { EMAIL, PASSWORD } from "constants/fieldNames";
import { USERS, HASH_OPTIONS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
// import BaseModel from "models/BaseModel";
import DbQuery from "utils/DbQuery";
import HashOptions from "models/HashOptions";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import RequestSession from "utils/RequestSession";
// import User from "models/User/types/User";
import User from "models/User";
import ValidationError from "utils/errors/ValidationError";
import hashPassword from "utils/hashPassword";
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

        const passwordIsValid = await isValidPassword(password, user);

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
        [PASSWORD, true]
    );
}

async function findUserByEmail (
    email: string
): Promise<User | null> {
    const users = await User.find({ email });
    return users[0];
}

async function isValidPassword (
    passwordToCheck: string,
    user: User
): Promise<boolean> | never {
    const {
        hashOptionsId,
        password
    } = user;

    const hashOptions = await HashOptions.findById(hashOptionsId);

    if (!hashOptions) {
        return false;
    }

    const {
        hash: hashToCheck
    } = hashPassword(passwordToCheck, hashOptions);

    return hashToCheck.equals(password);
}
