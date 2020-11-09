import {
    $and,
    $eq,
    $ilike,
    $like,
    $or
} from "#utils/const/database/modelOperators";

interface Operators {
    matchingOp?: typeof $eq | typeof $ilike | typeof $like;
    conjunctionOp?: typeof $and | typeof $or;
}

export default Operators;
