import {
    CreateHashOptionsTable,
    CreateUsersTable
} from "utils/AutomigrateSql";

import DbQuery from "utils/DbQuery";

type Automigrate = () => Promise<void>;

const automigrate: Automigrate = async function (): Promise<void> {
    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new DbQuery<unknown>()
        .query(createHashOptionsTable);

    const createUsersTableSql = new CreateUsersTable()
        .generate();
    await new DbQuery<unknown>()
        .query(createUsersTableSql);
};

export default automigrate;
