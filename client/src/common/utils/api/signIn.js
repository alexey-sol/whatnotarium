import superagent from "superagent";

async function signIn (credentials) {
    return superagent
        .post("/api/v0/session")
        .send(credentials);
}

export default signIn;
