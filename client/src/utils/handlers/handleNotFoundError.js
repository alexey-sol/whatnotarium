import { NOT_FOUND } from "utils/const/validationErrors";

function handleNotFoundError (history, error) {
    const isNotFoundError = error?.message === NOT_FOUND;

    if (!history || !error || !isNotFoundError) {
        return;
    }

    history.push("/");
}

export default handleNotFoundError;
