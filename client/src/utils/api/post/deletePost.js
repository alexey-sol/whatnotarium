import superagent from "superagent";

async function deletePost ({ id }) {
    const response = await superagent
        .delete(`/api/v1/post/${id}`)
        .set("Content-Type", "application/json");

    return response?.body;
}

export default deletePost;
