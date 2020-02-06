import { QueryResult } from "pg";
import ModelProps from "types/ModelProps";

export default interface DbQuery {
    query (
        queryName: string,
        props: ModelProps
    ): Promise<QueryResult> | never;
}
