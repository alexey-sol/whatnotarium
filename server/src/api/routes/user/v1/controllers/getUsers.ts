import { RequestHandler } from "express";

import Attributes from "#types/user/Attributes";
import UserService from "#services/UserService/v1";
import convertPaginOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";
import sendResponse from "#utils/http/sendResponse";

const getUsers: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const filter = convertPaginOptsToFilter<Attributes>(query);

    UserService.findUsers(filter)
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
