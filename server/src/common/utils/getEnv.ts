type Process = NodeJS.Process;

type IGetEnv = (nodeProcess?: Process) => string;

const getEnv: IGetEnv = function (
    nodeProcess: Process = process
): string {
    const { NODE_ENV: nodeEnv } = nodeProcess.env;

    const envIsString = typeof nodeEnv === "string";

    return (nodeEnv && envIsString)
        ? nodeEnv.trim()
        : "";
};

export default getEnv;
