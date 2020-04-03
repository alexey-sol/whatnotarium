import ProcessManager from "utils/helpers/ProcessManager";

const { processEnv } = new ProcessManager();

export default processEnv.POSTGRES_URL as string;
