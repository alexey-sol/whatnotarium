import superagent from "superagent";

async function updateUser ({ id, ...props }) {
    const response = await superagent
        .put(`/api/v1/user/${id}`)
        .set("Content-Type", "application/json")
        .send(props);

    return response?.body;
}

export default updateUser;
