import superagent from "superagent";

async function getPost (id) {
    const response = await superagent
        .get(`/api/v1/post/${id}`)
        .set("Content-Type", "application/json");

    return response?.body;
}

export default getPost;
