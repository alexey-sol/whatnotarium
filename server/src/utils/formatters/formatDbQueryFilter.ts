import DbQueryFilter from "#types/DbQueryFilter";
import ModelFormatter from "#utils/formatters/ModelFormatter/ModelFormatter";

function formatDbQueryFilter<RawProps, FormattedProps> (
    formatter: ModelFormatter<RawProps, FormattedProps>,
    filter?: DbQueryFilter<FormattedProps>
): DbQueryFilter<RawProps> | never {
    const where = filter?.where;

    const formattedWhere = (where)
        ? formatter.toDbCase(where)
        : where as unknown as RawProps;

    return {
        ...filter,
        where: formattedWhere
    };
}

export default formatDbQueryFilter;
