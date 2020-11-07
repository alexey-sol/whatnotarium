import Include from "#types/Include";

interface Model<InputType, ModelType> {
    save (): Promise<ModelType> | never;
    updateAttributes (props: InputType, include?: Include[]): Promise<ModelType> | never;
}

export default Model;
