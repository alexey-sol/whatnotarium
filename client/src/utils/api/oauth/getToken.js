import superagent from "superagent";

async function getToken ({ code, provider }) {
    const response = await superagent
        .get(`/api/v1/oauth/${provider}`)
        .set("Content-Type", "application/json")
        .query({ code });

    return response?.body;
}

export default getToken;
