import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/model";

const validatorPresets = {
    email: Joi.string().email({
        minDomainSegments: 2
    }),
    name: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(6)
};

const updateUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const bodyValidator = new PropsValidator(
        request.body,
        validatorPresets
    );

    const { id } = request.params;
    const { error, value: userData } = bodyValidator.validate();

    if (error) {
        // return next(error);
    }

    try {
        const user = await User.findById(id);
        const updatedUser = await user.updateAttributes(userData);
        response.status(200).send(updatedUser);
    } catch (error) {
        // return next(error);
    }
};

export default updateUser;
