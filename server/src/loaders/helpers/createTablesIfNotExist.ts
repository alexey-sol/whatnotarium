import { Pool } from "pg";

import {
    CreateHashOptionsTable,
    CreateUsersTable
} from "#utils/sql/CreateTableSql";

import PgQuery from "#utils/sql/PgQuery";

type CreateTablesIfNotExist = (pg: Pool) => Promise<void>;

const createTablesIfNotExist: CreateTablesIfNotExist = async function (
    pg: Pool
): Promise<void> {
    const createUsersTableSql = new CreateUsersTable()
        .generate();
    await new PgQuery<unknown>(pg)
        .query(createUsersTableSql);

    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new PgQuery<unknown>(pg)
        .query(createHashOptionsTable);
};

export default createTablesIfNotExist;
