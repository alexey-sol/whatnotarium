import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import {
    CURRENT_PASSWORD,
    EMAIL,
    ID,
    NAME,
    NEW_PASSWORD
} from "constants/fieldNames";

import { INVALID_PASSWORD, NO_USER_FOUND } from "constants/validationErrors";
import ApiController from "types/ApiController";
import FormattedUserProps from "models/User/types/FormattedProps";
import HashOptions from "models/HashOptions";
import HashPasswordOptions from "types/HashPasswordOptions";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import UpdateUserRequestBody from "models/User/types/UpdateUserRequestBody";
import User from "models/User";
import ValidationError from "utils/errors/ValidationError";
import hashPassword from "utils/hashPassword";
import isValidPassword from "utils/isValidPassword";
import sendResponse from "utils/sendResponse";

const updateUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const {
        error: paramsError,
        value: params
    } = validateParams(request.params);

    if (paramsError) {
        return next(paramsError);
    }

    const {
        error: bodyError,
        value: body
    } = validateBody(request.body);

    if (bodyError) {
        return next(bodyError);
    }

    const user = await User.findById(params.id);

    if (!user) {
        return next(new ValidationError(
            NO_USER_FOUND,
            404,
            request.ip
        ));
    }

    const { currentPassword, newPassword } = body;

    if (currentPassword && newPassword) {
        const passwordIsValid = await isValidPassword(currentPassword, user);

        if (!passwordIsValid) {
            return next(new ValidationError(
                INVALID_PASSWORD,
                400,
                request.ip
            ));
        }
    }

    updateUserAndSendResponse(user, body, response)
        .catch(next);
};

export default updateUser;

function validateParams (
    params: Indexer<unknown>
): Joi.ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}

function validateBody (
    body: Indexer<unknown>
): Joi.ValidationResult {
    const bodyValidator = new PropsValidator(
        body,
        { min: 1 }
    );

    return bodyValidator.validate(
        CURRENT_PASSWORD,
        EMAIL,
        NAME,
        NEW_PASSWORD
    );
}

async function updateUserAndSendResponse (
    user: User,
    props: UpdateUserRequestBody,
    response: Response
): Promise<Response> {
    let updatedUser = null;

    const {
        email,
        name,
        newPassword
    } = props;

    const updatedProps: FormattedUserProps = {
        email,
        name
    };

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);
        const { hash } = hashResult;

        await updateHashOptions(user.hashOptionsId, hashResult);
        updatedProps.password = hash;
    }

    updatedUser = await user.updateAttributes(updatedProps);
    return sendResponse(response, updatedUser);
}

async function updateHashOptions (
    id: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<void> {
    const hashOptions = await HashOptions.findById(id);
    await hashOptions?.updateAttributes(hashPasswordOptions);
}
