import ProcessManager from "#utils/helpers/ProcessManager";

interface ValidatedEnv {
    POSTGRES_URL: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    POSTGRES_URL
} = validatedEnv;

export default {
    url: POSTGRES_URL
};
