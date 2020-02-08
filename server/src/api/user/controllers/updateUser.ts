import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";
import validationPresets from "./updateUser.validation";

const updateUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const bodyValidator = new PropsValidator(
        request.body,
        validationPresets
    );

    const { id } = request.params;
    const { error, value } = bodyValidator.validate();

    if (error) {
        return next(error);
    }

    updateUserAndSendResponse()
        .catch(next); // TODO test if it works as expected

    async function updateUserAndSendResponse () {
        const user = await User.findById(id);
        const updatedUser = await user.updateAttributes(value);
        return sendResponse(response, updatedUser);
    }
};

export default updateUser;
