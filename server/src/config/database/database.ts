import DatabaseConfig from "./types/DatabaseConfig";
import EnvForDatabase from "./types/EnvForDatabase";

export default function (env: EnvForDatabase): DatabaseConfig {
    const {
        POSTGRES_URL
    } = env;

    return {
        url: POSTGRES_URL
    };
}
