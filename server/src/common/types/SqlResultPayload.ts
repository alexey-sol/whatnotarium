type SqlResultPayload<Type> =
    Promise<Type & Type[]>;

export default SqlResultPayload;
