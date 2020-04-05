import connectRedis from "connect-redis";
import redis from "redis";

import config from "#config";
import logger from "#logger";

export default function (
    session: any
): connectRedis.RedisStore {
    const { host, port } = config.redis;

    const RedisStore = connectRedis(session);
    const client = redis.createClient(port, host);

    client.on("error", (error) => logger.error(error));

    return new RedisStore(getRedisOptions(client));
}

function getRedisOptions (
    client: redis.RedisClient
): connectRedis.RedisStoreOptions {
    return {
        client,
        prefix: "geek-regime-session"
    };
}
