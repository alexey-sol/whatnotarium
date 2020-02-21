import superagent from "superagent";

async function signUp (credentials) {
    return superagent
        .post("/api/v0/user")
        .set("Content-Type", "application/json")
        .send(credentials);
}

export default signUp;
