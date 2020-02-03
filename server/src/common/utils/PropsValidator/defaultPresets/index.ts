import { AnySchema } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import nodeEnv from "./nodeEnv";

const DEFAULT_PRESETS: ObjectIndexer<AnySchema> = {
    ...nodeEnv
};

export default DEFAULT_PRESETS;
