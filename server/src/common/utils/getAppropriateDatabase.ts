import { PRODUCTION } from "constants/nodeEnv";
import ObjectIndexer from "types/ObjectIndexer";
import getEnv from "utils/getEnv";

type GetAppropriateDatabase = (
    env: ObjectIndexer<any>
) => string;

const getAppropriateDatabase: GetAppropriateDatabase = function (
    env: ObjectIndexer<any>
): string {
    const isProduction = getEnv() === PRODUCTION;

    return (isProduction)
        ? env.PG_DATABASE_PROD
        : env.PG_DATABASE_DEV;
};

export default getAppropriateDatabase;
