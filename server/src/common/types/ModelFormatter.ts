interface ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps;
    fromDbCase (props: RawProps): FormattedProps;
}

export default ModelFormatter;
