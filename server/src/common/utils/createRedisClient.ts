import connectRedis from "connect-redis";
import logger from "utils/winston";
import redis from "redis";

type CreateRedisClient = (
    session: any
) => connectRedis.RedisStore;

const createRedisClient: CreateRedisClient = function (
    session: any
): connectRedis.RedisStore {
    const RedisStore = connectRedis(session);
    const client = redis.createClient();

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
