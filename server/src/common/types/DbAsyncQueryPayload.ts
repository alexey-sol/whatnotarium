type DbAsyncQueryPayload<Type> =
    Promise<Type & Type[]>;

export default DbAsyncQueryPayload;
