import ObjectIndexer from "./ObjectIndexer";

interface Model<Type> extends ObjectIndexer<any> {
    save (): Promise<Type> | never;

    updateAttributes (
        data: ObjectIndexer<any>
    ): Promise<Type> | never;
}

export default Model;
