import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const getSearch: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { searchTerm } = query;

    UserService.searchUsers(searchTerm as string)
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getSearch;
