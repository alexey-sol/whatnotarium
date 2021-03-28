import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    HOST: string;
    PORT: string;
    URL: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    HOST,
    PORT,
    URL
} = validatedEnv;

export default {
    host: HOST,
    port: PORT,
    url: URL
};
