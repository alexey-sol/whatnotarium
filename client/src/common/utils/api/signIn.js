import superagent from "superagent";

async function signIn (credentials) {
    const response = await superagent
        .post("/api/v0/session")
        .set("Content-Type", "application/json")
        .send(credentials);

    return response?.body;
}

export default signIn;
