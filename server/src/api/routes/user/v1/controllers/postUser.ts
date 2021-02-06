import { RequestHandler } from "express";

import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
import RequestSession from "#utils/helpers/RequestSession";
import SupportService from "#services/SupportService/v1";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

import serverConfig from "#config/server";

const postUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const { email, id } = await UserService.createUser(request.body);
        const { token } = await SupportService.createToken(id);

        userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token, userId: id });
        // TODO: create session after confirmation
        // const session = new RequestSession(request);
        // session.attachUserToSession(user);

        // https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11984576#overview

        response.redirect(`${serverConfig.url}/.../${token}`);
        // sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default postUser;
