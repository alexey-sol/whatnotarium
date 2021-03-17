import superagent from "superagent";

async function restorePassword ({ email }) {
    const response = await superagent
        .post("/api/v1/support/reset")
        .set("Content-Type", "application/json")
        .send({ email });

    return response?.body;
}

export default restorePassword;
