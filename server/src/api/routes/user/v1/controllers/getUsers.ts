import { RequestHandler } from "express";

import Attributes from "#types/user/Attributes";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";
import convertPagingOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";

const getUsers: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const filter = convertPagingOptsToFilter<Attributes>({ ...query });

    UserService.findUsers(filter)
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
