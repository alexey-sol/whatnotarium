import redis from "redis";

import promisify from "#utils/helpers/promisify";

class PromisifiedRedisMethods {
    constructor (private client: redis.RedisClient) {
        this.client = client;
    }

    get (key: string): Promise<any> {
        const promisifiedGet = promisify(this.client.get.bind(this.client));
        return promisifiedGet(key);
    }

    set (key: string, value: string): Promise<string> {
        const promisifiedSet = promisify(this.client.set.bind(this.client));
        return promisifiedSet(key, value);
    }

    setex (key: string, expireInSec: number, value: string): Promise<string> {
        const promisifiedSetex = promisify(this.client.setex.bind(this.client));
        return promisifiedSetex(key, expireInSec, value);
    }

    del (...keys: string[]): Promise<boolean> {
        const promisifiedDel = promisify(this.client.del.bind(this.client));
        return promisifiedDel(...keys);
    }
}

export default PromisifiedRedisMethods;
