import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import { ID } from "constants/fieldNames";
import { USERS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import Indexer from "types/Indexer";
import PropsValidator from "utils/PropsValidator";
import sendResponse from "utils/sendResponse";

const deleteUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { error, value } = validateParams(request.params);

    if (error) {
        return next(error);
    }

    BaseModel.destroyById(USERS, value.id)
        .then(result => sendResponse(response, result))
        .catch(next);
};

export default deleteUser;

function validateParams (
    params: Indexer<unknown>
): Joi.ValidationResult {
    const paramsValidator = new PropsValidator(params);
    return paramsValidator.validate(ID);
}
