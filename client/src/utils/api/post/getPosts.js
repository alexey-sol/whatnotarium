import superagent from "superagent";

async function getPosts (filter) {
    const response = await superagent
        .get("/api/v1/post")
        .set("Content-Type", "application/json")
        .query(filter);

    return response?.body;
}

export default getPosts;
