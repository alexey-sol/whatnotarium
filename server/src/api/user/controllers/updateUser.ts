import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import queryText from "./updateUser.query";
import makeDbQuery from "utils/makeDbQuery";

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
    const { error, value } = bodyValidator.validate();
    
    if (error) {
        console.log(error)
        // return next(error);
    }

    const {
        email,
        name,
        password
    } = value;

    try {
        const result = await makeDbQuery(
            "update-user",
            queryText,
            [email, password, name, id]
        );

        const updatedUser = result.rows[0];
        response.status(200).send(updatedUser);
    } catch (error) {
        console.log(error)
        // return next(error);
    }
};

export default updateUser;
