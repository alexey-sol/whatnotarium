import superagent from "superagent";

async function updateProfile (params) {
    const response = await superagent
        .put("/api/v0/user")
        .set("Content-Type", "application/json")
        .send(params);

    return response && response.body;
}

export default updateProfile;
