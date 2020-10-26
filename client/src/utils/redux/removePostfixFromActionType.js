import {
    FAILURE_POSTFIX as FAILURE,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

function removePostfixFromActionType (actionType = "") {
    return splitByPostfix(actionType);
}

export default removePostfixFromActionType;

function splitByPostfix (string = "") {
    const re = new RegExp(`\\s?-\\s?(${FAILURE}|${START}|${SUCCESS})$`);
    const match = string.match(re);

    return (match)
        ? match.input.split(match[0])[0]
        : string;
}
