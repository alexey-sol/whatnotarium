import ProcessManager from "utils/helpers/ProcessManager";

const { processEnv } = new ProcessManager();

const {
    HOST,
    PORT,
    URL
} = processEnv;

export default {
    host: HOST as string,
    port: PORT as unknown as number,
    url: URL as string
};
