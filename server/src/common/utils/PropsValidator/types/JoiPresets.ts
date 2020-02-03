import { NumberSchema, StringSchema } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";

export default interface JoiPresets extends ObjectIndexer<
    NumberSchema |
    StringSchema |
    undefined
> {
    HOST?: StringSchema;
    NODE_ENV?: StringSchema;
    PORT?: NumberSchema;
    SESSION_SECRET?: StringSchema;
    URL?: StringSchema;
}
