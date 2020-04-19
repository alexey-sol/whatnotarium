abstract class ModelFormatter<RawProps, FormattedProps> {
    abstract toDbCase (props: FormattedProps): RawProps;

    abstract fromDbCase (props: RawProps): FormattedProps;

    isDbCase (props: FormattedProps | RawProps): boolean {
        return Boolean(Object
            .keys(props)
            .find(propName => propName.includes("_"))
        );
    }
}

export default ModelFormatter;
