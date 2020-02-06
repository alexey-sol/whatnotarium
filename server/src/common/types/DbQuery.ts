import { QueryResult } from "pg";
import ModelProps from "types/ModelProps";

export default interface DbQuery {
    query (
        id: string,
        props: ModelProps
    ): Promise<QueryResult> | never;
}
