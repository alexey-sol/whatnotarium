import { USERS } from "constants/dbTableNames";
import BaseModel from "./BaseModel";

class User extends BaseModel {}
User.setTableName(USERS);

export default User;
