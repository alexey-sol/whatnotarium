import { NumberSchema, StringSchema } from "@hapi/joi";

import IIndexer from "types/IIndexer";

export default interface IJoiPresets extends IIndexer<
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
