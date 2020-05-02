interface DbQueryFilter<Props> {
    limit?: number;
    offset?: number;
    order?: string;
    where?: Props;
}

export default DbQueryFilter;
