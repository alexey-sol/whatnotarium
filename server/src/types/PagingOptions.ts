import Indexer from "./Indexer";

interface PagingOptions extends Indexer<unknown> {
    count?: number;
    page?: number;
}

export default PagingOptions;
