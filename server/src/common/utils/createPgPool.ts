import { Pool } from "pg";

import connectionString from "config/database";

type CreatePgPool = () => Pool;

const createPgPool: CreatePgPool = function (): Pool {
    return new Pool({
        connectionString
    });
};

export default createPgPool;
