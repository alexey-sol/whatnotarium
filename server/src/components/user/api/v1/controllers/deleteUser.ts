import { RequestHandler } from "express";

import HashOptions from "hashOptions/model";
import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const deleteUser: RequestHandler = async function (
    { params },
    response,
    next
): Promise<void> {
    try {
        const { id } = params;
        const user = await User.findById(+id) as User;

        const { hashOptionsId } = user;
        const result = await User.destroyById(+id);
        await HashOptions.destroyById(hashOptionsId);

        sendResponse(response, result);
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
