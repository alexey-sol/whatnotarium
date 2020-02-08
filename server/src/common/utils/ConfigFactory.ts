import { DATABASE, SERVER } from "constants/componentNames";
import Factory from "types/Factory";
import ObjectIndexer from "types/ObjectIndexer";
import getAppropriateDatabase from "utils/getAppropriateDatabase";

type ComponentName =
    typeof DATABASE |
    typeof SERVER;

class ConfigFactory<Type> implements Factory<Type> {
    constructor (private componentName: ComponentName) {
        this.componentName = componentName;
    }

    create (env: ObjectIndexer<any>): Type {
        const isServer = this.componentName === SERVER;
        let config = {};

        if (isServer) {
            config = this.createServerConfig(env);
        } else {
            config = this.createDatabaseConfig(env);
        }

        return config as Type;
    }

    private createServerConfig (env: ObjectIndexer<any>) {
        return {
            host: env.HOST,
            port: env.PORT,
            url: env.URL
        };
    }

    private createDatabaseConfig (env: ObjectIndexer<any>) {
        const database = getAppropriateDatabase(env);
    
        return {
            database,
            host: env.PG_HOST,
            port: env.PG_PORT,
            user: env.PG_USER,
            password: env.PG_PASSWORD
        };
    }
}

export default ConfigFactory;
