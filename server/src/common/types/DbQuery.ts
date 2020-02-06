import ModelProps from "types/ModelProps";
import DbAsyncQueryPayload from "types/DbAsyncQueryPayload"

export default interface DbQuery<Type> {
    query (
        queryName: string,
        props?: ModelProps
    ): DbAsyncQueryPayload<Type> | Promise<boolean> | never;
}
