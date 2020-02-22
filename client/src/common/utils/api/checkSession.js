import superagent from "superagent";

async function checkSession () {
    return superagent
        .get("/api/v0/session")
        .set("Content-Type", "application/json");
}

export default checkSession;
