import ObjectIndexer from "./ObjectIndexer";

export default interface Model<Type> extends ObjectIndexer<any> {
    save (): Promise<Type> | never;

    updateAttributes (
        data: ObjectIndexer<any>
    ): Promise<Type> | never;
}
