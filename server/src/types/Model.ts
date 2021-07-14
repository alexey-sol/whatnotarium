import Include from "#types/Include";

interface Model<InputType, ModelType> {
    updateAttributes (props: InputType, include?: Include[]): Promise<ModelType> | never;
}

export default Model;
