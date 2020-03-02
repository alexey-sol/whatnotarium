import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import { EMAIL_OCCUPIED, INVALID_PROPS } from "constants/validationErrors";

import ApiController from "types/ApiController";
import HashOptions from "models/HashOptions";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "models/User";
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

        const hashOptions = await HashOptions.create(hashResult);

        if (!hashOptions) {
            return next(new ValidationError(
                INVALID_PROPS,
                400,
                request.ip
            ));
        }

        const user = await User.create({
            ...value,
            hashOptionsId: hashOptions.id,
            password: hash
        });

        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
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
    const user = await User.findOne({ email });
    return Boolean(user);
}
