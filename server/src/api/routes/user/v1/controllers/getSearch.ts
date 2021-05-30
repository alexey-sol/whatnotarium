import { RequestHandler } from "express";

import Attributes from "#types/user/Attributes";
import UserService from "#services/UserService/v1";
import convertPagingOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";
import sendResponse from "#utils/http/sendResponse";

const getSearch: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { count, page, searchTerm } = query;

    const filter = convertPagingOptsToFilter<Attributes>({
        count: (count) ? +count : undefined,
        page: (page) ? +page : undefined
    });

    UserService.searchUsers(searchTerm as string, filter)
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getSearch;
