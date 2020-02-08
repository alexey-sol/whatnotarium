type Process = NodeJS.Process;

type GetEnv = (
    nodeProcess?: Process
) => string;

const getEnv: GetEnv = function (
    nodeProcess: Process = process
): string {
    const { NODE_ENV } = nodeProcess.env;
    const isString = typeof NODE_ENV === "string";

    return (NODE_ENV && isString)
        ? NODE_ENV.trim()
        : "";
};

export default getEnv;
