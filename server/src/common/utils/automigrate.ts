import {
    CreateHashOptionsTable,
    CreateUserTable
} from "utils/AutomigrateSql";

import PgQuery from "utils/PgQuery";

type Automigrate = () => Promise<void>;

const automigrate: Automigrate = async function (): Promise<void> {
    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createHashOptionsTable);

    const createUserTableSql = new CreateUserTable()
        .generate();
    await new PgQuery<unknown>()
        .query(createUserTableSql);
};

export default automigrate;
