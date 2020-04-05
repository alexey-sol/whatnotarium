import { Pool } from "pg";

import databaseConfig from "#config/database";
import createTablesIfNotExist from "./helpers/createTablesIfNotExist";
import logger from "./logger";

export default function (): Pool {
    const pg = new Pool({
        connectionString: databaseConfig.url
    });

    createTablesIfNotExist(pg)
        .catch(error => logger.error(error));

    return pg;
}
