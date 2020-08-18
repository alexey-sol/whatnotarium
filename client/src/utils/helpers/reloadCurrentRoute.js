const logPrefix = "[utils: reloadCurrentRoute]";

function reloadCurrentRoute (history) {
    if (!history) {
        return console.error(`${logPrefix} No history argument provided`);
    }

    history.push("/");
    history.goBack();
}

export default reloadCurrentRoute;
