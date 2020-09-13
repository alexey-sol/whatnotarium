import { DEFAULT_COUNT } from "#utils/const/paginationOptions";
import DbQueryFilter from "#types/DbQueryFilter";
import PaginationOptions from "#root/src/types/PaginationOptions";

function convertPaginOptsToFilter<Props> (
    options: PaginationOptions
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

export default convertPaginOptsToFilter;
