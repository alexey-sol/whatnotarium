import Indexer from "types/Indexer";
import SqlQueryPayload from "types/SqlQueryPayload";

interface Sql {
    generate (props?: Indexer<unknown>): SqlQueryPayload;
}

export default Sql;
