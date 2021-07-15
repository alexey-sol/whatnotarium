import ProcessManager from "#utils/wrappers/ProcessManager";

const pool = require("#connectionPool").default;
const resetTables = require("#utils/test/resetTables").default;

before(() => resetTables());

after(async () => {
    await resetTables();
    exit();
});

function exit (): void {
    new ProcessManager(pool).exit("Done testing", 0);
}
