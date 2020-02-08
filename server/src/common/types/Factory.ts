import ObjectIndexer from "./ObjectIndexer";

interface Factory<Type> {
    create (donorObject?: ObjectIndexer<any>): Type;
}

export default Factory;
