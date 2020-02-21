import superagent from "superagent";

async function signIn (credentials) {
    return superagent
        .post("/api/v0/session")
        .set("Content-Type", "application/json")
        .send(credentials);
}

export default signIn;
