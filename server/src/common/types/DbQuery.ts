import ModelProps from "types/ModelProps";
import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";

interface DbQuery<Type> {
    query (
        props?: ModelProps
    ): DbAsyncQueryPayload<Type> | never;
}

export default DbQuery;
