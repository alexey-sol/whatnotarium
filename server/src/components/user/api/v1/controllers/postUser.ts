import { RequestHandler } from "express";

import HashOptions from "hashOptions/model";
import User from "user/model";
import hashPassword from "utils/helpers/hashPassword";
import sendResponse from "utils/http/sendResponse";

const postUser: RequestHandler = async function (
    { body },
    response,
    next
): Promise<void> {
    const { password } = body;

    try {
        const hashResult = await hashPassword(password);
        const { hash } = hashResult;

        const hashOptions = await HashOptions.create(hashResult);

        const user = await User.create({
            ...body,
            hashOptionsId: hashOptions.id,
            password: hash
        });

        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default postUser;
