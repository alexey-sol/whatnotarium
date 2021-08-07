import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    CACHE_STORE_HOST: string;
    CACHE_STORE_PORT: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    CACHE_STORE_HOST,
    CACHE_STORE_PORT
} = validatedEnv;

export default {
    host: CACHE_STORE_HOST,
    port: CACHE_STORE_PORT
};
