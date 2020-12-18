import superagent from "superagent";

async function voteForPost ({ id, ...props }) {
    const response = await superagent
        .put(`/api/v1/post/${id}/vote`)
        .set("Content-Type", "application/json")
        .send({ ...props });

    return response?.body;
}

export default voteForPost;
