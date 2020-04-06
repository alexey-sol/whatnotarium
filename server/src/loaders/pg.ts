import { Pool } from "pg";

import createTablesIfNotExist from "./helpers/createTablesIfNotExist";
import databaseConfig from "#config/database";
import logger from "./logger";

export default function (): Pool {
    const pg = new Pool({
        connectionString: databaseConfig.url
    });

    createTablesIfNotExist(pg)
        .catch(error => logger.error(error));

    return pg;
}
