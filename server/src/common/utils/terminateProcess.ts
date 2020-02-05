import { Client, Pool } from "pg";
import http from "http";

import { SIGTERM } from "constants/signals";

type Process = NodeJS.Process;
type Server = http.Server;

type TerminateProcess = (
    server?: Server,
    pg?: Client | Pool,
    nodeProcess?: Process
) => Promise<void>;

const terminateProcess: TerminateProcess = async function (
    server?: Server,
    pg?: Client | Pool,
    nodeProcess: Process = process
): Promise<void> {
    if (pg) {
        await pg.end();
    }

    if (server) {
        nodeProcess.kill(nodeProcess.pid, SIGTERM);
    } else {
        nodeProcess.exit(1);
    }
};

export default terminateProcess;
