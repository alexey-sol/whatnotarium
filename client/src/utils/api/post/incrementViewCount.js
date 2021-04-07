import superagent from "superagent";

async function incrementViewCount (id) {
    const response = await superagent
        .put(`/api/v1/post/${id}/view`)
        .set("Content-Type", "application/json")
        .send();

    return response?.body;
}

export default incrementViewCount;
