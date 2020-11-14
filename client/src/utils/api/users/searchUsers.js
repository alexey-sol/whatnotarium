import superagent from "superagent";

async function searchUsers (searchTerm) {
    const response = await superagent
        .get("/api/v1/user/search")
        .set("Content-Type", "application/json")
        .query({ searchTerm });

    return response?.body;
}

export default searchUsers;
