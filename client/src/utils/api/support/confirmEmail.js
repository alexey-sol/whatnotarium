import superagent from "superagent";

async function confirmEmail (token) {
    const response = await superagent
        .post("/api/v1/support/confirm")
        .set("Content-Type", "application/json")
        .send({ token: encodeURIComponent(token) });

    return response?.body;
}

export default confirmEmail;
