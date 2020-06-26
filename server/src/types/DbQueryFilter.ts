import Include from "./Include";

interface DbQueryFilter<Props> {
    groupBy?: string;
    include?: Include[];
    limit?: number;
    offset?: number;
    order?: string;
    where?: Props;
}

export default DbQueryFilter;
