interface Model<InputType, ModelType> {
    save (): Promise<ModelType> | never;
    updateAttributes (props: InputType): Promise<ModelType> | never;
}

export default Model;
