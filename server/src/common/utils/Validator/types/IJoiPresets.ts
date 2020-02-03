import { NumberSchema, StringSchema } from "@hapi/joi";

import IObjectIndexer from "types/IObjectIndexer";

export default interface IJoiPresets extends IObjectIndexer<
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
