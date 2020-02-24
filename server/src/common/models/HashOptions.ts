import { HASH_OPTIONS } from "constants/dbTableNames";
import BaseModel from "./BaseModel";

class HashOptions extends BaseModel {}
HashOptions.setTableName(HASH_OPTIONS);

export default HashOptions;
