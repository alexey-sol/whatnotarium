import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    ORIGIN: string;
    SERVER_PORT: string;
    SERVER_PORT_EXTERNAL: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    ORIGIN,
    SERVER_PORT,
    SERVER_PORT_EXTERNAL
} = validatedEnv;

export default {
    origin: ORIGIN,
    port: SERVER_PORT,
    url: `http://localhost:${SERVER_PORT_EXTERNAL}`
};
