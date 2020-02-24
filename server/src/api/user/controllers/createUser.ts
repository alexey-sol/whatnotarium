import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import { EMAIL_OCCUPIED } from "constants/validationErrors";
import { HASH_OPTIONS, USERS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import HashPasswordResult from "types/HashPasswordResult";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import ValidationError from "utils/errors/ValidationError";
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

    const { email, password } = value;

    try {
        const emailIsOccupied = await checkIfEmailIsOccupied(email);

        if (emailIsOccupied) {
            throw new ValidationError(
                EMAIL_OCCUPIED,
                400,
                request.ip
            );
        }

        const hashResult = hashPassword(password);
        const { hash } = hashResult;

        const hashOptions = await BaseModel.create(
            HASH_OPTIONS,
            getHashOptionsProps(hashResult)
        );

        const user = await BaseModel.create(
            USERS,
            getUserProps(value, hash, hashOptions)
        );

        sendResponse(response, user);
    } catch (error) {
        next(error);
    } // TODO: email verification
};

export default createUser;

function validateBody (
    body: Indexer<unknown>
): Joi.ValidationResult {
    const bodyValidator = new PropsValidator(body);

    return bodyValidator.validate(
        [EMAIL, true],
        [NAME, true],
        [PASSWORD, true]
    );
}

async function checkIfEmailIsOccupied (
    email: string
): Promise<boolean> | never {
    const user = await BaseModel.findOne(USERS, { email });
    return Boolean(user);
}

function getHashOptionsProps (
    hashPasswordResult: HashPasswordResult
): Indexer<unknown> {
    const { digest, iterations, keyLength, salt } = hashPasswordResult;

    return {
        digest,
        iterations,
        key_length: keyLength,
        salt
    };
}

function getUserProps (
    value: Joi.ValidationResult,
    hash: Buffer,
    hashOptions: Indexer<unknown> | null
): Indexer<unknown> {
    return {
        ...value,
        password: hash,
        hash_options_id: hashOptions && hashOptions.id
    };
}
