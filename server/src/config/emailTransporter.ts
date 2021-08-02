import ProcessManager from "#utils/wrappers/ProcessManager";

interface ValidatedEnv {
    EMAIL_TRANSPORTER_API_KEY: string;
    SENDER_EMAIL: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    EMAIL_TRANSPORTER_API_KEY,
    SENDER_EMAIL
} = validatedEnv;

export default {
    apiKey: EMAIL_TRANSPORTER_API_KEY,
    senderEmail: SENDER_EMAIL
};
