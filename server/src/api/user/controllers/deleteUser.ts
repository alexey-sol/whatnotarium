import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import queryText from "./deleteUser.query";
import makeDbQuery from "utils/makeDbQuery";

const deleteUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;

    try {
        await makeDbQuery(
            "delete-user",
            queryText,
            [id]
        );

        response.status(200).send({ id });
    } catch (error) {
        // return next(error);
    }
};

export default deleteUser;
