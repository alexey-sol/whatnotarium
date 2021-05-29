import { RequestHandler } from "express";

import Attributes from "#types/post/Attributes";
import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";
import convertPagingOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";

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

    PostService.searchPosts(searchTerm as string, filter)
        .then(posts => sendResponse(response, posts))
        .catch(next);
};

export default getSearch;
