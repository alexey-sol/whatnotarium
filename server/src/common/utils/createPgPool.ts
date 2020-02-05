import { Pool } from "pg";

import dbConfig from "config/db";

type CreatePgPool = () => Pool;

const createPgPool: CreatePgPool = function (): Pool {
    return new Pool(dbConfig);
}

export default createPgPool;
