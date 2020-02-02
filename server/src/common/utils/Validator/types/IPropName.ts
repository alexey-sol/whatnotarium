import {
    HOST,
    NODE_ENV,
    PORT,
    SESSION_SECRET,
    URL
} from "constants/env";

type IPropName =
    typeof HOST |
    typeof NODE_ENV |
    typeof PORT |
    typeof SESSION_SECRET |
    typeof URL;

export default IPropName;
