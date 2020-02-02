type Process = NodeJS.Process;

type IGetEnv = (
    nodeProcess?: Process
) => string;

const getEnv: IGetEnv = function (
    nodeProcess: Process = process
): string {
    const { NODE_ENV: env } = nodeProcess.env;

    const envIsString = typeof env === "string";

    return (env && envIsString)
        ? env.trim()
        : "";
};

export default getEnv;
