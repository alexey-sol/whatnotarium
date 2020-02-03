import { Request, Response, NextFunction } from "express";

import IController from "types/IController";

const createUser: IController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    console.log("createUser");
};

const getUser: IController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const { id } = request.params;
    console.log("getUser");
};

const updateUser: IController = function (
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
