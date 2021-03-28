import redis from "redis";

import RedisClient from "#utils/wrappers/RedisClient";
import logger from "#logger";
import redisConfig from "#config/redis";

const { host, port } = redisConfig;

const client = redis.createClient(+port, host);
client.on("error", (error) => logger.error(error));

export default new RedisClient(client);
