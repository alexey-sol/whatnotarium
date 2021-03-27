import superagent from "superagent";

async function sendResetToken ({ email }) {
    const response = await superagent
        .get("/api/v1/support/reset")
        .set("Content-Type", "application/json")
        .query({ email });

    return response?.body;
}

export default sendResetToken;
