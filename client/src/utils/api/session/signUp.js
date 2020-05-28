import superagent from "superagent";

async function signUp (credentials) {
    const response = await superagent
        .post("/api/v1/user")
        .set("Content-Type", "application/json")
        .send(credentials);

    return response?.body;
}

export default signUp;
