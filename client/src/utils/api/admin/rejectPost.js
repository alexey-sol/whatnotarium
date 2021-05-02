import superagent from "superagent";

async function rejectPost ({ id }) {
    const response = await superagent
        .put(`/api/v1/admin/post/${id}`)
        .set("Content-Type", "application/json")
        .send({ isApproved: false });

    return response?.body;
}

export default rejectPost;
