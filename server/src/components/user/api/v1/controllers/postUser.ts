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

        const user = await User.create({
            ...body,
            createdAt: new Date(),
            password: hash,
            updatedAt: new Date()
        });

        await HashOptions.create({
            ...hashResult,
            userId: user.id
        });

        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default postUser;
