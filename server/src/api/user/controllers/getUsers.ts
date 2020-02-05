import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import queryText from "./getUsers.query";
import makeDbQuery from "utils/makeDbQuery";

const getUsers: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await makeDbQuery(
            "get-users",
            queryText
        );

        const users = result.rows;
        response.status(200).send(users);
    } catch (error) {
        // return next(error);
    }
};

export default getUsers;
