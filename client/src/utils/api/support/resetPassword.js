import superagent from "superagent";

async function resetPassword (data) {
    const response = await superagent
        .post("/api/v1/support/reset")
        .set("Content-Type", "application/json")
        .send(data);

    return response?.body;
}

export default resetPassword;
