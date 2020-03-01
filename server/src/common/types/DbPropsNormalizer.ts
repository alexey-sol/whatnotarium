interface DbPropsNormalizer {
    normalizeInput (props: unknown): unknown;
    normalizeOutput (props: unknown): unknown;
}

export default DbPropsNormalizer;
