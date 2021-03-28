import redis from "redis";

import { DEFAULT_EXPIRE_IN_SEC } from "#utils/const/caching";
import isJSON from "#utils/helpers/isJSON";

class RedisClient {
    constructor (private client: redis.RedisClient) {
        this.client = client;
    }

    getClient (): redis.RedisClient {
        return this.client;
    }

    createKey (prefix: string, options: Record<string, any>): string {
        return (options)
            ? `${prefix}-${JSON.stringify(options)}`
            : prefix;
    }

    get (key: string): Promise<any> | never {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, value) => {
                if (error) {
                    reject(error);
                }

                resolve((value && isJSON(value))
                    ? JSON.parse(value)
                    : value);
            });
        });
    }

    set (key: string, value: any): Promise<void> | never {
        const stringifiedValue = (typeof value === "string")
            ? value
            : JSON.stringify(value);

        return new Promise((resolve, reject) => {
            this.client.set(key, stringifiedValue, (error) => (error)
                ? reject(error)
                : resolve());
        });
    }

    setEX (key: string, value: any, expireInSec = DEFAULT_EXPIRE_IN_SEC): Promise<void> | never {
        const stringifiedValue = (typeof value === "string")
            ? value
            : JSON.stringify(value);

        return new Promise((resolve, reject) => {
            this.client.setex(key, expireInSec, stringifiedValue, (error) => (error)
                ? reject(error)
                : resolve());
        });
    }
}

export default RedisClient;
