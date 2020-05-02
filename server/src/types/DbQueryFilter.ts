interface DbQueryFilter<WhereType> {
    limit?: number;
    offset?: number;
    order?: string;
    where?: WhereType;
}

export default DbQueryFilter;
