import cp from "#connectionPool";
import createTablesIfNotExist from "./helpers/createTablesIfNotExist";
import logger from "./logger";

export default async function (): Promise<void> {
    try {
        await createTablesIfNotExist(cp);
    } catch (error) {
        logger.error(error);
    }
}
