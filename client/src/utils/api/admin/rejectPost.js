import superagent from "superagent";

async function rejectPost ({ id, message }) {
    const response = await superagent
        .put(`/api/v1/admin/post/${id}`)
        .set("Content-Type", "application/json")
        .send({ isApproved: false, message });

    return response?.body;
}

export default rejectPost;
