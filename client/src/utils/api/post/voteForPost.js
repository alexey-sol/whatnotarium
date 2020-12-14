import superagent from "superagent";

async function voteForPost ({ postId, ...props }) {
    const response = await superagent
        .put(`/api/v1/post/${postId}/vote`)
        .set("Content-Type", "application/json")
        .send({ ...props });

    return response?.body;
}

export default voteForPost;
