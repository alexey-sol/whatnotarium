import superagent from "superagent";

async function fetchUsers (options) {
    const response = await superagent
        .get("/api/v1/user")
        .set("Content-Type", "application/json")
        .query(options);

    return response?.body;
}

export default fetchUsers;
