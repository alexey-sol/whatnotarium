import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, NAME, PASSWORD } from "constants/fieldNames";
import { EMAIL_OCCUPIED } from "constants/validationErrors";
import ApiController from "types/ApiController";
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
    const emailIsOccupied = await checkIfEmailIsOccupied(email);

    if (emailIsOccupied) {
        return next(new ValidationError(
            EMAIL_OCCUPIED,
            400,
            request.ip
        ));
    }

    const { hash } = hashPassword(password);

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
): Promise<boolean> {
    const user = await User.findOne({ email });
    return Boolean(user);
}
