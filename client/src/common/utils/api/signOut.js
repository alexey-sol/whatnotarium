import superagent from "superagent";

async function signOut () {
    return superagent
        .delete("/api/v0/session")
        .set("Content-Type", "application/json");
}

export default signOut;
