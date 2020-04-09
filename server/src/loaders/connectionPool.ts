import { Pool } from "pg";

import databaseConfig from "#config/database";

const connectionPool = new Pool({
    connectionString: databaseConfig.url
});

export default connectionPool;
