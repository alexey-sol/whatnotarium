import { Client, Pool } from "pg";
import http from "http";

import { SIGTERM } from "constants/signals";

type Process = NodeJS.Process;
type Server = http.Server;

type TerminateProcess = (
    server?: Server,
    pg?: Client | Pool,
    nodeProcess?: Process
) => void;

const terminateProcess: TerminateProcess = function (
    server?: Server,
    pg?: Client | Pool,
    nodeProcess: Process = process
): void {
    if (server) {
        killProcessAndCloseDb(nodeProcess, pg);
    } else {
        nodeProcess.exit(1);
    }
};

export default terminateProcess;

async function killProcessAndCloseDb (
    nodeProcess: Process,
    pg?: Client | Pool
): Promise<void> {
    if (pg) await pg.end();
    nodeProcess.kill(nodeProcess.pid, SIGTERM);
}
