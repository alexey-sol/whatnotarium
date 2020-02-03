import {
    HOST,
    NODE_ENV,
    PORT,
    SESSION_SECRET,
    URL
} from "constants/env";

type PropName =
    typeof HOST |
    typeof NODE_ENV |
    typeof PORT |
    typeof SESSION_SECRET |
    typeof URL;

export default PropName;
