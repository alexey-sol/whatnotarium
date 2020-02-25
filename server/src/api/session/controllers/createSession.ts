import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, PASSWORD } from "constants/fieldNames";
import { INVALID_CREDENTIALS, NO_USER_FOUND } from "constants/validationErrors";
import { USERS, HASH_OPTIONS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import HashPasswordOptions from "types/HashPasswordOptions";
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

        const passwordIsValid = await isValidPassword(password, user);

        if (!passwordIsValid) {
            return next(new ValidationError(
                INVALID_CREDENTIALS,
                401,
                request.ip
            ));
        }

        const isAlreadySignedIn = (
            request.session &&
            request.session.user &&
            request.cookies &&
            request.cookies[name]
        );

        if (!isAlreadySignedIn) {
            request.session!.user = user.id;
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

async function isValidPassword (
    passwordToCheck: string,
    user: Indexer<unknown>
): Promise<boolean> | never {
    const {
        hash_options_id: hashOptionsId, // TODO: format function?
        password
    } = user;

    const hashOptionsRecord = await BaseModel.findById(
        HASH_OPTIONS,
        hashOptionsId as string
    );

    if (!hashOptionsRecord) {
        return false;
    }

    const {
        digest,
        iterations,
        key_length: keyLength, // TODO: format function?
        salt
    } = hashOptionsRecord;

    const hashOptions = {
        digest,
        iterations,
        keyLength,
        salt
    } as HashPasswordOptions;

    const {
        hash: hashThashoCheck
    } = hashPassword(passwordToCheck, hashOptions);

    return hashThashoCheck.equals(password as Buffer);
}
