import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import {
    CURRENT_PASSWORD,
    EMAIL,
    ID,
    NAME,
    NEW_PASSWORD
} from "@const/fieldNames";

import { INVALID_PASSWORD, NO_USER_FOUND } from "@const/validationErrors";
import ApiController from "@common/types/ApiController";
import FormattedUserProps from "@user/model/types/FormattedProps";
import HashOptions from "@hashOptions/model";
import HashPasswordOptions from "@common/types/HashPasswordOptions";
import Indexer from "@common/types/Indexer";
import PropsValidator from "@common/utils/PropsValidator";
import UpdateUserRequestBody from "@user/model/types/UpdateUserRequestBody";
import User from "@user/model";
import ValidationError from "@common/errors/ValidationError";
import hashPassword from "@common/utils/helpers/hashPassword";
import isValidPassword from "@common/utils/helpers/isValidPassword";
import sendResponse from "@common/utils/helpers/sendResponse";

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
