import ProcessManager from "#utils/helpers/ProcessManager";

interface ValidatedEnv {
    REDIS_HOST: string;
    REDIS_PORT: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    REDIS_HOST,
    REDIS_PORT
} = validatedEnv;

export default {
    host: REDIS_HOST,
    port: REDIS_PORT
};
