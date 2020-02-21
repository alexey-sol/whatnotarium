import Indexer from "./Indexer";

interface Model<Type> extends Indexer<unknown> {
    save (): Promise<Type> | never;

    updateAttributes (
        data: Indexer<unknown>
    ): Promise<Type> | never;
}

export default Model;
