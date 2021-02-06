import ProcessManager from "#utils/helpers/ProcessManager";

interface ValidatedEnv {
    SENDER_EMAIL: string;
    SENDGRID_API_KEY: string;
}

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv as unknown as ValidatedEnv;

const {
    SENDER_EMAIL,
    SENDGRID_API_KEY
} = validatedEnv;

export default {
    apiKey: SENDGRID_API_KEY,
    senderEmail: SENDER_EMAIL
};
