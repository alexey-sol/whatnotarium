import SqlQueryPayload from "./SqlQueryPayload";

interface SqlGenerator<InputType> {
    generate (input?: InputType): SqlQueryPayload;
}

export default SqlGenerator;
