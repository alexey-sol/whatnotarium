import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { EMAIL, ID, NAME, PASSWORD } from "constants/fieldNames";
import ApiController from "types/ApiController";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import User from "models/User";
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

    updateUserAndSendResponse(params.id, body, response)
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
        EMAIL,
        NAME,
        PASSWORD
    );
}

async function updateUserAndSendResponse (
    id: number,
    props: Indexer<unknown>,
    response: Response
): Promise<Response> {
    const user = await User.findById(id);
    let updatedUser = null;

    if (user) {
        updatedUser = await user.updateAttributes(props);
    }

    return sendResponse(response, updatedUser);
}
