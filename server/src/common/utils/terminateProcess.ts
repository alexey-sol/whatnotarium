import http from "http";

import { SIGTERM } from "constants/signals";

type Process = NodeJS.Process;
type Server = http.Server;

type TerminateProcess = (
    server?: Server,
    nodeProcess?: Process
) => void;

const terminateProcess: TerminateProcess = function (
    server?: Server,
    nodeProcess: Process = process
): void {
    if (server) {
        nodeProcess.kill(nodeProcess.pid, SIGTERM);
    } else {
        nodeProcess.exit(1);
    }
};

export default terminateProcess;
