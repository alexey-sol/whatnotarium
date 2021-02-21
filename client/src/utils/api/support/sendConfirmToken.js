import superagent from "superagent";

async function sendConfirmToken (token) {
    const response = await superagent
        .post("/api/v1/support/confirm")
        .set("Content-Type", "application/json")
        .send({ token });

    return response?.body;
}

// TODO: add to redux

export default sendConfirmToken;
