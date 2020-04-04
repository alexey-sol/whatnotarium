import superagent from "superagent";

async function checkSession () {
    const response = await superagent
        .get("/api/v1/session")
        .set("Content-Type", "application/json");

    return response?.body;
}

export default checkSession;
