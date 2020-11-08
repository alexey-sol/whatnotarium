import superagent from "superagent";

async function fetchUser ({ id }) {
    const response = await superagent
        .get(`/api/v1/user/${id}`)
        .set("Content-Type", "application/json");

    return response?.body;
}

export default fetchUser;
