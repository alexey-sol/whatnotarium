import connectRedis from "connect-redis";
import redis from "redis";

import logger from "utils/winston";
import redisConfig from "config/redis";

type CreateRedisClient = (
    session: any
) => connectRedis.RedisStore;

const createRedisClient: CreateRedisClient = function (
    session: any
): connectRedis.RedisStore {
    const { host, port } = redisConfig;

    const RedisStore = connectRedis(session);
    const client = redis.createClient(port, host);

    client.on("error", (error) => logger.error(error));

    return new RedisStore(getRedisOptions(client));
};

export default createRedisClient;

function getRedisOptions (
    client: redis.RedisClient
): connectRedis.RedisStoreOptions {
    return {
        client,
        prefix: "geek-regime-session"
    };
}
