import superagent from "superagent";

async function updatePost (id, props) {
    const response = await superagent
        .put(`/api/v1/post/${id}}`)
        .set("Content-Type", "application/json")
        .send(props);

    return response?.body;
}

export default updatePost;
