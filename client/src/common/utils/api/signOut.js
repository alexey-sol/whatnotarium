import superagent from "superagent";

async function signOut () {
    const response = await superagent
        .delete("/api/v0/session")
        .set("Content-Type", "application/json");

    return response && response.body;
}

export default signOut;
