import Indexer from "./Indexer";

interface PaginationOptions extends Indexer<unknown> {
    count?: number;
    page?: number;
}

export default PaginationOptions;
