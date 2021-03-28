import connectRedis from "connect-redis";
import redis from "redis";

import redisClient from "#redisClient";

function initRedisStore (
    session: any
): connectRedis.RedisStore {
    const client = redisClient.getClient();
    const RedisStore = connectRedis(session);
    return new RedisStore(getRedisStoreOptions(client));
}

export default initRedisStore;

function getRedisStoreOptions (
    client: redis.RedisClient
): connectRedis.RedisStoreOptions {
    return {
        client,
        prefix: "geek-regime-session"
    };
}
