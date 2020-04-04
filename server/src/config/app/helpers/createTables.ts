import {
    CreateHashOptionsTable,
    CreateUsersTable
} from "utils/sql/CreateTableSql";

import PgQuery from "utils/sql/PgQuery";

type CreateTables = () => Promise<void>;

const createTables: CreateTables = async function (): Promise<void> {
    const createUsersTableSql = new CreateUsersTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createUsersTableSql);

    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createHashOptionsTable);
};

export default createTables;
