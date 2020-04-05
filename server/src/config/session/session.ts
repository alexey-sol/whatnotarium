import EnvForSession from "./types/EnvForSession";
import SessionConfig from "./types/SessionConfig";

export default function (env: EnvForSession): SessionConfig {
    const {
        SESSION_NAME,
        SESSION_SECRET
    } = env;

    return {
        name: SESSION_NAME,
        secret: SESSION_SECRET
    };
}
