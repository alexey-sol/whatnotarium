import superagent from "superagent";

async function fetchPosts (searchTerm) {
    const response = await superagent
        .get("/api/v1/post/search")
        .set("Content-Type", "application/json")
        .query({ searchTerm });

    return response?.body;
}

export default fetchPosts;
