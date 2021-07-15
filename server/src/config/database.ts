import { TEST } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    POSTGRES_DB: string;
    POSTGRES_DB_TEST: string;
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
}

const { nodeEnv, processEnv } = new ProcessManager();
const env = processEnv as unknown as ValidatedEnv;
const isTest = nodeEnv === TEST;

const databaseName = (isTest)
    ? env.POSTGRES_DB_TEST
    : env.POSTGRES_DB;

export default {
    url: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}` +
        `@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${databaseName}`
};
