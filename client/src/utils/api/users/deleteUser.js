import superagent from "superagent";

async function deleteUser ({ id }) {
    const response = await superagent
        .delete(`/api/v1/user/${id}`)
        .set("Content-Type", "application/json");

    return response?.body;
}

export default deleteUser;
