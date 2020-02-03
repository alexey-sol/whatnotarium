import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";

const createUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    console.log("createUser");
};

const getUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const { id } = request.params;
    console.log("getUser");
};

const updateUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const { id } = request.params;
    console.log("updateUser");
};

export {
    getUser,
    createUser,
    updateUser
};
