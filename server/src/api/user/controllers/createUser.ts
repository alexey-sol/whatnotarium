import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import { EMAIL_OCCUPIED, NO_REQUIRED_PROPS } from "constants/validationErrors";
import { HASH_OPTIONS, USERS } from "constants/dbTableNames";

import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
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
            generateHashOptionsProps(hashResult)
        );

        if (!hashOptions) {
            return next(new ValidationError(
                NO_REQUIRED_PROPS,
                400,
                request.ip
            ));
        }

        const formattedCreateUserInput = formatCreateUserInput({
            ...value,
            hashOptionsId: hashOptions.id,
            password: hash
        });

        const user = await BaseModel.create(
            USERS,
            formattedCreateUserInput
        );

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
    const user = await BaseModel.findOne(USERS, { email });
    return Boolean(user);
}

function generateHashOptionsProps (

) {

}
