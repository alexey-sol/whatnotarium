import { Pool } from "pg";

import config from "#config";
import createTablesIfNotExist from "./helpers/createTablesIfNotExist";
import logger from "./logger";

export default function (): Pool {
    const pg = new Pool({
        connectionString: config.database.url
    });

    createTablesIfNotExist(pg)
        .catch(error => logger.error(error));

    return pg;
}
