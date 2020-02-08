import ModelProps from "types/ModelProps";
import DbAsyncQueryPayload from "types/DbAsyncQueryPayload"

export default interface DbQuery<Type> {
    query (
        props?: ModelProps
    ): DbAsyncQueryPayload<Type> | never;
}
