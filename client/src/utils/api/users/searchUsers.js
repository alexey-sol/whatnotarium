import superagent from "superagent";

async function searchUsers (props) {
    const response = await superagent
        .get("/api/v1/user/search")
        .set("Content-Type", "application/json")
        .query(props);

    return response?.body;
}

export default searchUsers;
