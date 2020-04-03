import ProcessManager from "utils/helpers/ProcessManager";

const { processEnv } = new ProcessManager();

const {
    REDIS_HOST,
    REDIS_PORT
} = processEnv;

export default {
    host: REDIS_HOST as string,
    port: REDIS_PORT as unknown as number
};
