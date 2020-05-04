import superagent from "superagent";

async function signOut () {
    const response = await superagent
        .delete("/api/v1/session")
        .set("Content-Type", "application/json");

    return response?.body;
}

export default signOut;
