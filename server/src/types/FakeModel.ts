interface FakeModel<Model, Props> {
    populate (): Promise<Props> | Props | never;
    save (): Promise<Model> | never;
}

export default FakeModel;
