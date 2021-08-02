import { TEST } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    DATABASE_DB: string;
    DATABASE_DB_TEST: string;
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
}

const { nodeEnv, processEnv } = new ProcessManager();
const env = processEnv as unknown as ValidatedEnv;
const isTest = nodeEnv === TEST;

const databaseName = (isTest)
    ? env.DATABASE_DB_TEST
    : env.DATABASE_DB;

export default {
    url: `postgres://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}` +
        `@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${databaseName}`
};
