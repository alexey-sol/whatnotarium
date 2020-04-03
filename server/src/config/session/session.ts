import ProcessManager from "utils/helpers/ProcessManager";

const { processEnv } = new ProcessManager();

const {
    SESSION_NAME,
    SESSION_SECRET
} = processEnv;

export default {
    name: SESSION_NAME as string,
    secret: SESSION_SECRET as string
};
