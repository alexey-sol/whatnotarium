import superagent from "superagent";

async function sendConfirmToken ({ email, token }) {
    const key = (token) ? "token" : "email";
    const value = token || email;

    const response = await superagent
        .get("/api/v1/support/confirm")
        .set("Content-Type", "application/json")
        .query({ [key]: encodeURIComponent(value) });

    return response?.body;
}

export default sendConfirmToken;
