import superagent from "superagent";

async function approvePost ({ id }) {
    const response = await superagent
        .put(`/api/v1/admin/post/${id}`)
        .set("Content-Type", "application/json")
        .send({ isApproved: true });

    return response?.body;
}

export default approvePost;
