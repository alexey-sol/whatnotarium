import superagent from "superagent";

async function searchPosts (props) {
    const response = await superagent
        .get("/api/v1/post/search")
        .set("Content-Type", "application/json")
        .query(props);

    return response?.body;
}

export default searchPosts;
