import superagent from "superagent";

async function checkSession () {
    const response = await superagent
        .get("/api/v0/session")
        .set("Content-Type", "application/json");

    return response && response.body;
}

export default checkSession;
