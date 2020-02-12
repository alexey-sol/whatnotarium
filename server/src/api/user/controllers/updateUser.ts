import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import ModelProps from "types/ModelProps";
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
        validationPresets,
        { min: 1 }
    );

    const { id } = request.params;
    const { error, value } = bodyValidator.validate();

    if (error) {
        return next(error);
    }

    updateUserAndSendResponse(id, value, response)
        .catch(next);
};

export default updateUser;

async function updateUserAndSendResponse (
    id: string,
    props: ModelProps,
    response: Response
): Promise<Response> {
    const user = await User.findById(id);
    let updatedUser = null;

    if (user) {
        updatedUser = await user.updateAttributes(props);
    }

    return sendResponse(response, updatedUser);
}
