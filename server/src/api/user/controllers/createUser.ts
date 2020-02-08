import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";
import validationPresets from "./createUser.validation";

const createUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const bodyValidator = new PropsValidator(
        request.body,
        validationPresets
    );

    const { error, value } = bodyValidator.validate();

    if (error) {
        return next(error);
    }

    User.create(value)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default createUser;
