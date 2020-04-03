import { RequestHandler } from "express";

import { ALREADY_EXISTS } from "const/validationErrors";
import User from "user/model";
import UserError from "errors/UserError";

const postUser: RequestHandler = async function (
    { body, ip },
    response,
    next
): Promise<void> {
    const { email } = body;

    try {
        const alreadyExists = await checkIfAlreadyExists(email);

        if (alreadyExists) {
            throw new UserError(ALREADY_EXISTS, 400, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default postUser;

async function checkIfAlreadyExists (
    email: string
): Promise<boolean> | never {
    const user = await User.findOne({ email });
    return Boolean(user);
}
