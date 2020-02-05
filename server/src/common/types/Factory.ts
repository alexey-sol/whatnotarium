import ObjectIndexer from "./ObjectIndexer";

export default interface Factory<Type> {
    create (donorObject?: ObjectIndexer<any>): Type
}
