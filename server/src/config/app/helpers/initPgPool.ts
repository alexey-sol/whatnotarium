import { Pool } from "pg";

import connectionString from "@config/database";

type InitPgPool = () => Pool;

const initPgPool: InitPgPool = function (): Pool {
    return new Pool({
        connectionString
    });
};

export default initPgPool;
