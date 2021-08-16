import { CorsOptions } from "cors";

import serverConfig from "#config/server";

const corsOptions: CorsOptions = {
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    origin: serverConfig.origin
};

export default corsOptions;
