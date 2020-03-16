import superagent from "superagent";

async function updateProfile (id, props) {
    const response = await superagent
        .put(`/api/v0/user/${id}`)
        .set("Content-Type", "application/json")
        .send(props);

    return response?.body;
}

export default updateProfile;
