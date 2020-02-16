import Indexer from "./Indexer";

interface Model<Type> extends Indexer<any> {
    save (): Promise<Type> | never;

    updateAttributes (
        data: Indexer<any>
    ): Promise<Type> | never;
}

export default Model;
