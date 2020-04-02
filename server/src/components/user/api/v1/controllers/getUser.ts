import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { ID } from "@const/fieldNames";
import ApiController from "@common/types/ApiController";
import Indexer from "@common/types/Indexer";
import PropsValidator from "@common/utils/PropsValidator";
import User from "@user/model";
import sendResponse from "@common/utils/helpers/sendResponse";

const getUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateParams(request.params);

    if (error) {
        return next(error);
    }

    User.findById(value.id)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getUser;

function validateParams (
    params: Indexer<unknown>
): Joi.ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}
