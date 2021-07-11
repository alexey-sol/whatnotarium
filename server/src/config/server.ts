import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    SERVER_PORT: string;
    SERVER_PORT_EXTERNAL: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    SERVER_PORT,
    SERVER_PORT_EXTERNAL
} = validatedEnv;

export default {
    port: SERVER_PORT,
    url: `http://localhost:${SERVER_PORT_EXTERNAL}`
};
