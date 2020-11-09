import Include from "./Include";
import Operators from "./Operators";

interface DbQueryFilter<Props> {
    groupBy?: string;
    include?: Include[];
    limit?: number;
    offset?: number;
    operators?: Operators;
    order?: string;
    where?: Props;
}

export default DbQueryFilter;
