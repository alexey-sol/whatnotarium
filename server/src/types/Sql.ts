import Indexer from "./Indexer";
import SqlQueryPayload from "./SqlQueryPayload";

interface Sql {
    generate (props?: Indexer<unknown>): SqlQueryPayload;
}

export default Sql;
