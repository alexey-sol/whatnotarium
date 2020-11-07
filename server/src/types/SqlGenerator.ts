import SqlQueryPayload from "./SqlQueryPayload";

interface SqlGenerator<InputType> {
    generate (
        input?: InputType,
        returningFields?: string[]
    ): SqlQueryPayload;
}

export default SqlGenerator;
