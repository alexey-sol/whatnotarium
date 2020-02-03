import { Request, Response, NextFunction } from "express";

type IController = (
    request: Request,
    response: Response,
    next: NextFunction
) => void | never;

export default IController;
