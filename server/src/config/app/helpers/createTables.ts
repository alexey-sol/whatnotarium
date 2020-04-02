import {
    CreateHashOptionsTable,
    CreateUserTable
} from "@common/utils/CreateTableSql";

import PgQuery from "@common/utils/helpers/PgQuery";

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
