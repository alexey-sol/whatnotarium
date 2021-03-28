import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    SESSION_NAME: string;
    SESSION_SECRET: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    SESSION_NAME,
    SESSION_SECRET
} = validatedEnv;

export default {
    name: SESSION_NAME,
    secret: SESSION_SECRET
};
