import {
    CreateHashOptionsTable,
    CreateUserTable
} from "utils/AutomigrateSql";

import DbQuery from "utils/DbQuery";

type Automigrate = () => Promise<void>;

const automigrate: Automigrate = async function (): Promise<void> {
    const createHashOptionsTable = new CreateHashOptionsTable()
        .generate();
    await new DbQuery<unknown>()
        .query(createHashOptionsTable);

    const createUserTableSql = new CreateUserTable()
        .generate();
    await new DbQuery<unknown>()
        .query(createUserTableSql);
};

export default automigrate;
