import { DEFAULT_COUNT } from "#utils/const/paginationOptions";
import DbQueryFilter from "#types/DbQueryFilter";
import PagingOptions from "#types/PagingOptions";

function convertPagingOptsToFilter<Props> (
    options: PagingOptions
): DbQueryFilter<Props> {
    const {
        count = DEFAULT_COUNT,
        page,
        ...rest
    } = options;

    return {
        ...rest,
        limit: count,
        offset: (page)
            ? (page - 1) * count
            : 0
    };
}

export default convertPagingOptsToFilter;
