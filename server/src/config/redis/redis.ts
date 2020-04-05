import EnvForRedis from "./types/EnvForRedis";
import RedisConfig from "./types/RedisConfig";

export default function (env: EnvForRedis): RedisConfig {
    const {
        REDIS_HOST,
        REDIS_PORT
    } = env;

    return {
        host: REDIS_HOST,
        port: REDIS_PORT
    };
}
