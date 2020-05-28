import superagent from "superagent";

async function createPost (props) {
    const response = await superagent
        .post("/api/v1/post")
        .set("Content-Type", "application/json")
        .send(props);

    return response?.body;
}

export default createPost;
