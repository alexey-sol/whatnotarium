import {
    CreateHashOptionsTable,
    CreateUserTable
} from "utils/CreateTableSql";

import PgQuery from "utils/PgQuery";

type CreateTables = () => Promise<void>;

const createTables: CreateTables = async function (): Promise<void> {
    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createHashOptionsTable);

    const createUserTableSql = new CreateUserTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createUserTableSql);
};

export default createTables;
