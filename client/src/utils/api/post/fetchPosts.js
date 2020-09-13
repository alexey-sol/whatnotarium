import superagent from "superagent";

async function fetchPosts (options) {
    const response = await superagent
        .get("/api/v1/post")
        .set("Content-Type", "application/json")
        .query(options);

    return response?.body;
}

export default fetchPosts;
