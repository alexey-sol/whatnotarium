import { TEST } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/helpers/ProcessManager";

interface ValidatedEnv {
    POSTGRES_URL: string;
    POSTGRES_URL_TEST: string;
}

const { nodeEnv, processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    POSTGRES_URL,
    POSTGRES_URL_TEST
} = validatedEnv;

const isTest = nodeEnv === TEST;

export default {
    url: (isTest)
        ? POSTGRES_URL_TEST
        : POSTGRES_URL
};
