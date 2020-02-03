type Process = NodeJS.Process;

type GetEnv = (
    nodeProcess?: Process
) => string;

const getEnv: GetEnv = function (
    nodeProcess: Process = process
): string {
    const { NODE_ENV: env } = nodeProcess.env;

    const envIsString = typeof env === "string";

    return (env && envIsString)
        ? env.trim()
        : "";
};

export default getEnv;
